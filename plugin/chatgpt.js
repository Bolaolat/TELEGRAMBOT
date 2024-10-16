// plugin/chatgpt.js
const OpenAI = require('openai'); // Import OpenAI SDK
const config = require('../config'); // Import config file

const openai = new OpenAI({
    apiKey: config.openaiApiKey,
});

// Function to handle ChatGPT interaction
async function handleChatGPT(bot, chatId, message) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        });
        
        const chatGptResponse = response.choices[0].message.content;
        await deletePreviousMessage(bot, chatId);
        const replyMessage = await bot.sendMessage(chatId, chatGptResponse);
        return replyMessage.message_id; // Return message ID for tracking
    } catch (error) {
        console.error(`Error communicating with OpenAI: ${error.message}`);
        await deletePreviousMessage(bot, chatId);
        const errorMessage = await bot.sendMessage(chatId, 'Sorry, I could not process your request at the moment.');
        return errorMessage.message_id; // Return message ID for tracking
    }
}

// Function to delete the previous message
async function deletePreviousMessage(bot, chatId) {
    if (lastMessages[chatId]) {
        try {
            await bot.deleteMessage(chatId, lastMessages[chatId]);
        } catch (error) {
            console.error(`Error deleting message for chat ID ${chatId}:`, error.message);
        }
    }
}

module.exports = {
    handleChatGPT,
};