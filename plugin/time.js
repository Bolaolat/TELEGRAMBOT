function startDigitalClock(bot, chatId) {
    bot.sendMessage(chatId, '🕒 Starting digital clock...').then((message) => {
        let messageId = message.message_id;
        let elapsedTime = 0; // Initialize elapsed time

        const intervalId = setInterval(() => {
            elapsedTime += 1; // Increment elapsed time by 1 second

            if (elapsedTime > 10) { // Stop after 10 seconds
                clearInterval(intervalId);
                bot.sendMessage(chatId, '⏹️ Digital clock stopped.');
                return;
            }

            const now = new Date();
            const timeMessage = `🕒 Current time in Lagos, Nigeria:\n${now.toLocaleTimeString("en-NG", { 
                timeZone: "Africa/Lagos", 
                hour12: false 
            })} ⏰`;

            // Delete the previous message
            bot.deleteMessage(chatId, messageId).catch((error) => {
                if (error.response && error.response.statusCode === 400) {
                    clearInterval(intervalId);
                }
            });

            // Send a new message with the updated time
            bot.sendMessage(chatId, timeMessage).then((newMessage) => {
                messageId = newMessage.message_id; // Update messageId to the new message's ID
            }).catch((error) => {
                if (error.response && error.response.statusCode === 400) {
                    clearInterval(intervalId);
                }
            });

        }, 1000); // Update every second

        return intervalId;
    });
}

module.exports = { startDigitalClock };
