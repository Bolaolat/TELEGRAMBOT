// Required modules
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const config = require('./config');
const getAnimalFact = require('./plugin/animalfact');
const calculate = require('./plugin/calculator');
const getRiddle = require('./plugin/riddle');
const getInspiration = require('./plugin/inspire');
const { startDigitalClock } = require('./plugin/time');
const { getQuestion } = require('./plugin/question'); // Import question plugin
// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;
// Initialize Telegram bot
const token = config.telegramToken;
const bot = new TelegramBot(token, { polling: true });

// Initialize user states and last messages
const userStates = {};
const lastMessages = {};
const userIntervals = {};

// Function to delete the previous message
async function deletePreviousMessage(chatId) {
    if (lastMessages[chatId]) {
        try {
            await bot.deleteMessage(chatId, lastMessages[chatId]);
        } catch (error) {
            console.error(`Error deleting message for chat ID ${chatId}:`, error);
        }
    }
}

// Function to handle the /start command
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    userStates[chatId] = { step: 0 };

    await deletePreviousMessage(chatId);

    const message = await bot.sendMessage(chatId, '*💥✨ THANK YOU FOR CHOOSING ✨💥*\n*B L U E X D E M O N   B O T*', {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: '🚀 Proceed', callback_data: 'proceed' }],
                [{ text: '❌ Exit', callback_data: 'exit' }]
            ]
        }
    });
    lastMessages[chatId] = message.message_id;
});

// Function to handle callback queries (for button commands)
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const action = query.data;

    switch (action) {
        case 'proceed':
            showFunctionOptions(chatId, 0);
            break;
        case 'exit':
            handleExit(chatId);
            break;
        case 'get_telegram_id':
            getTelegramId(chatId);
            break;
        case 'open_bot_directory':
            showBotNames(chatId);
            break;
        default:
            await handleFunctions(chatId, action);
            break;
    }
});

// Function to handle exit
async function handleExit(chatId) {
    if (userIntervals[chatId]) {
        clearInterval(userIntervals[chatId]);
        delete userIntervals[chatId];
    }
    await deletePreviousMessage(chatId);
    bot.sendMessage(chatId, 'GOODBYE! 👋');
    delete userStates[chatId];
}

// Function to show function options with an image
async function showFunctionOptions(chatId, startIndex) {
    const functions = [
        { text: '📛 Get My ID', callback_data: 'get_telegram_id' },
        { text: '📂 Bot File', callback_data: 'open_bot_directory' },
        { text: '➕ Calculator', callback_data: 'calculate' },
        { text: '🕒 Check Time', callback_data: 'check_time' },
        { text: '💡 Inspire Me', callback_data: 'inspire_me' },
        { text: '🐾 Animal Fact', callback_data: 'animal_fact' },
        { text: '🧩 Riddles', callback_data: 'riddle' },
        { text: '🪙 Flip a Coin', callback_data: 'flip_coin' },
        { text: '💱 Convert Currency', callback_data: 'convert_currency' },
        { text: '📝 Start Quiz', callback_data: 'quiz' } // Added quiz option
    ];

    const currentOptions = functions.slice(startIndex, startIndex + 6);
    const hasMore = startIndex + 6 < functions.length;

    const inlineKeyboard = [
        currentOptions.slice(0, 3),
        currentOptions.slice(3, 6),
        hasMore ? [{ text: '➡️ Next', callback_data: `next_${startIndex + 6}` }] : [],
        startIndex > 0 ? [{ text: '⬅️ Previous', callback_data: `prev_${startIndex - 6}` }] : []
    ];

    await deletePreviousMessage(chatId);

    // Send the image with the menu
    const photoMessage = await bot.sendPhoto(chatId, './media/menu.jpg', {
        caption: 'Choose a function:',
        reply_markup: { inline_keyboard: inlineKeyboard }
    });

    // Save the last message ID
    lastMessages[chatId] = photoMessage.message_id;
}

// Function to get and send the user's Telegram ID
async function getTelegramId(chatId) {
    await deletePreviousMessage(chatId);
    const message = await bot.sendMessage(chatId, `📛 Your Telegram ID is: ${chatId}`);
    lastMessages[chatId] = message.message_id;
}

// Function to show bot names and their respective directories
async function showBotNames(chatId) {
    const bots = [
        { text: 'DEVIL SCRIPT', url: 'bots/DevilScript 5.0 Gen 3 fixx.zip' },
        { text: 'DELTACRASH', url: 'bots/deltacrash. ℓσя∂ ткм.7z' }
    ];

    const botButtons = bots.map(bot => [{ text: bot.text, url: bot.url }]);
    botButtons.push([{ text: '⬅️ Back', callback_data: 'proceed' }]);

    await deletePreviousMessage(chatId);

    const message = await bot.sendMessage(chatId, '📂 Select a bot to download:', {
        reply_markup: { inline_keyboard: botButtons }
    });
    lastMessages[chatId] = message.message_id;
}

// Function to ask a question and get the correct answer
async function askQuestion(chatId) {
    const { question, options, answer } = getQuestion();
    const optionsWithCallbackData = options.map((option) => {
        return {
            text: option,
            callback_data: option.charAt(0) // Use the first character as the callback data (A, B, C, D)
        };
    });

    const message = await bot.sendMessage(chatId, question, {
        reply_markup: {
            inline_keyboard: [optionsWithCallbackData]
        }
    });
    lastMessages[chatId] = message.message_id;
    return answer; // Return the correct answer for later comparison
}

// Function to handle the different actions
async function handleFunctions(chatId, action) {
    try {
        const responses = {
            animal_fact: getAnimalFact(),
            inspire_me: getInspiration(),
            flip_coin: `🪙 The coin landed on: ${Math.random() < 0.5 ? 'Heads' : 'Tails'}! 🎉`
        };

        if (responses[action]) {
            await deletePreviousMessage(chatId);
            const message = await bot.sendMessage(chatId, responses[action] + ' 🥳');
            lastMessages[chatId] = message.message_id;
        } else if (action === 'check_time') {
            if (userIntervals[chatId]) clearInterval(userIntervals[chatId]);
            userIntervals[chatId] = startDigitalClock(bot, chatId);
        } else if (action === 'calculate') {
            await deletePreviousMessage(chatId);
            bot.sendMessage(chatId, "Please enter an arithmetic expression using +, -, *, or / symbols.");
            userStates[chatId].step = 'calculate';
        } else if (action === 'riddle') {
            const { question, answer } = getRiddle();
            await deletePreviousMessage(chatId);
            const message = await bot.sendMessage(chatId, question);
            lastMessages[chatId] = message.message_id;
            setTimeout(() => bot.sendMessage(chatId, `🧩 Answer: ${answer}`), 5000);
        } else if (action === 'quiz') {
            const correctAnswer = await askQuestion(chatId);
            userStates[chatId].correctAnswer = correctAnswer; // Store the correct answer for later use
        } else if (action === 'convert_currency') {
            await deletePreviousMessage(chatId);
            bot.sendMessage(chatId, 'Please enter the conversion in the format: `amount FROM TO` (e.g., `100 USD EUR`).');
            userStates[chatId].step = 'convert_currency';
        } else if (action.startsWith('next_') || action.startsWith('prev_')) {
            const newStartIndex = parseInt(action.split('_')[1], 10);
            showFunctionOptions(chatId, newStartIndex);
        }
    } catch (error) {
        console.error(`Error handling function for action ${action} in chat ${chatId}:`, error);
    }
}

// Handle user messages for specific actions
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userState = userStates[chatId];

    if (userState && userState.step === 'calculate') {
        const expression = msg.text;
        try {
            const result = calculate(expression);
            await deletePreviousMessage(chatId);
            const message = await bot.sendMessage(chatId, `🧮 The result is: ${result} 🎉`);
            lastMessages[chatId] = message.message_id;
            userStates[chatId].step = 0; // Reset the user step after calculation
        } catch (error) {
            await deletePreviousMessage(chatId);
            bot.sendMessage(chatId, `❌ ${error.message}`);
        }
    } else if (userState && userState.step === 'convert_currency') {
        const [amount, fromCurrency, toCurrency] = msg.text.split(' ');
        try {
            const result = await convertCurrency(chatId, amount, fromCurrency, toCurrency);
            await deletePreviousMessage(chatId);
            const message = await bot.sendMessage(chatId, `💱 ${result}`);
            lastMessages[chatId] = message.message_id;
            userStates[chatId].step = 0; // Reset the user step after conversion
        } catch (error) {
            await deletePreviousMessage(chatId);
            bot.sendMessage(chatId, `❌ ${error.message}`);
        }
    } else if (userState && userState.correctAnswer) {
        // Check if the answer to the quiz is correct
        const userAnswer = msg.text.charAt(0); // Get the first character as the user's answer
        if (userAnswer.toUpperCase() === userState.correctAnswer.toUpperCase()) {
            await deletePreviousMessage(chatId);
            const message = await bot.sendMessage(chatId, '✅ Correct answer! 🎉');
            lastMessages[chatId] = message.message_id;
        } else {
            await deletePreviousMessage(chatId);
            const message = await bot.sendMessage(chatId, `❌ Incorrect answer! The correct answer was: ${userState.correctAnswer}`);
            lastMessages[chatId] = message.message_id;
        }
        // Clear the stored correct answer after responding
        delete userStates[chatId].correctAnswer;
    }
});

// Function to convert currency
async function convertCurrency(chatId, amount, fromCurrency, toCurrency) {
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/43f31fb84c391ced11b216a4/pair/${fromCurrency}/${toCurrency}/${amount}`);
        return `${amount} ${fromCurrency} is approximately ${response.data.conversion_result} ${toCurrency}`;
    } catch (error) {
        console.error('Error fetching currency conversion:', error);
        throw new Error('Currency conversion failed. Please try again.');
    }
}

// Express server setup to keep the bot running
app.get('/', (req, res) => {
    res.send(`
       
    `);
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});