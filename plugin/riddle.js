// plugin/riddle.js

// Array of riddles
const riddles = [
    {
        question: "🧩 I have keys but open no locks. What am I?",
        options: ["A Keyboard", "A Treasure Chest"],
        answer: "A Keyboard"
    },
    {
        question: "🧩 What has to be broken before you can use it?",
        options: ["An Egg", "A Promise"],
        answer: "An Egg"
    },
    {
        question: "🧩 I'm tall when I'm young, and I'm short when I'm old. What am I?",
        options: ["A Candle", "A Tree"],
        answer: "A Candle"
    },
    {
        question: "🧩 What begins with T, ends with T, and has T in it?",
        options: ["A Teapot", "A Tent"],
        answer: "A Teapot"
    },
    {
        question: "🧩 What has a heart that doesn't beat?",
        options: ["An Artichoke", "A Rock"],
        answer: "An Artichoke"
    },
    {
        question: "🧩 What is full of holes but still holds water?",
        options: ["A Sponge", "A Bucket"],
        answer: "A Sponge"
    },
    {
        question: "🧩 What gets wetter as it dries?",
        options: ["A Towel", "A River"],
        answer: "A Towel"
    },
    {
        question: "🧩 What can travel around the world while staying in a corner?",
        options: ["A Stamp", "A Globe"],
        answer: "A Stamp"
    },
    {
        question: "🧩 What can you catch but not throw?",
        options: ["A Cold", "A Ball"],
        answer: "A Cold"
    },
    {
        question: "🧩 What has one eye but cannot see?",
        options: ["A Needle", "A Cyclops"],
        answer: "A Needle"
    },
    {
        question: "🧩 What has many teeth but cannot bite?",
        options: ["A Comb", "A Shark"],
        answer: "A Comb"
    },
    {
        question: "🧩 What is so fragile that saying its name breaks it?",
        options: ["Silence", "Glass"],
        answer: "Silence"
    },
    {
        question: "🧩 I speak without a mouth and hear without ears. What am I?",
        options: ["An Echo", "A Shadow"],
        answer: "An Echo"
    },
    {
        question: "🧩 The more of this there is, the less you see. What is it?",
        options: ["Darkness", "Light"],
        answer: "Darkness"
    },
    {
        question: "🧩 What can you hold in your right hand but not in your left?",
        options: ["Your Left Hand", "A Glass"],
        answer: "Your Left Hand"
    },
    {
        question: "🧩 What has cities, but no houses; forests, but no trees; and rivers, but no water?",
        options: ["A Map", "A Picture"],
        answer: "A Map"
    },
    {
        question: "🧩 What has a neck but no head?",
        options: ["A Bottle", "A Shirt"],
        answer: "A Bottle"
    },
    {
        question: "🧩 What is always in front of you but can't be seen?",
        options: ["The Future", "Air"],
        answer: "The Future"
    },
    {
        question: "🧩 What goes up but never comes down?",
        options: ["Your Age", "A Balloon"],
        answer: "Your Age"
    },
    {
        question: "🧩 What is made of water but if you put it into water it will die?",
        options: ["Ice", "A Fish"],
        answer: "Ice"
    },
    {
        question: "🧩 What runs around the yard without moving?",
        options: ["A Fence", "A Dog"],
        answer: "A Fence"
    },
];

// Function to fetch a random riddle
function getRiddle() {
    const riddle = riddles[Math.floor(Math.random() * riddles.length)];
    return riddle;
}

module.exports = getRiddle;