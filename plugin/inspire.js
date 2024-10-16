// Plugin for getting an inspirational quote
const quotes = [
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "Act as if what you do makes a difference. It does. - William James",
    "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "If you can dream it, you can achieve it. - Zig Ziglar",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Everything you’ve ever wanted is on the other side of fear. - George Addair",
    "Opportunities don't happen. You create them. - Chris Grosser",
    "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. - Roy T. Bennett",
    "Hardships often prepare ordinary people for an extraordinary destiny. - C.S. Lewis",
    "Keep your face always toward the sunshine—and shadows will fall behind you. - Walt Whitman",
    "It always seems impossible until it is done. - Nelson Mandela",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. - Christian D. Larson"
];

// Function to get a random inspirational quote
module.exports = function getInspiration() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
};
