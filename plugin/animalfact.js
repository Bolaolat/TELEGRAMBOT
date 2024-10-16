// plugin/animalfact.js

// Function to generate a random animal fact
function getAnimalFact() {
    const facts = [
        "🐾 Did you know? A shrimp's heart is located in its head! 💖",
        "🐾 A snail can sleep for three years! 💤",
        "🐾 Elephants are the only animals that can't jump. 🐘",
        "🐾 Slugs have four noses! 🐌",
        "🐾 Octopuses have three hearts. 💓",
        "🐾 Cows have best friends and can get stressed when separated. 🐄❤️",
        "🐾 A group of flamingos is called a 'flamboyance'. 🦩",
        "🐾 Koalas have fingerprints almost identical to humans. 🐨",
        "🐾 Sea otters hold hands while sleeping to stay together. 🦦",
        "🐾 Frogs can freeze without dying. ❄️🐸",
        "🐾 Butterflies taste with their feet. 🦋",
        "🐾 Honey never spoils, and edible honey has been found in ancient tombs! 🍯",
        "🐾 Sharks have been around longer than trees. 🦈",
        "🐾 Polar bears have black skin under their white fur. 🐻‍❄️",
        "🐾 The heart of a blue whale is the size of a car. 🚗🐋",
        "🐾 Kangaroos can't walk backward. 🦘",
        "🐾 Dolphins have names for each other and can call each other by those names. 🐬",
        "🐾 Horses and cows sleep standing up. 🐎🐄",
        "🐾 A group of crows is called a 'murder'. 🪶",
        "🐾 Ants never sleep, and they don't have lungs! 🐜",
        "🐾 A rhinoceros's horn is made of hair. 🦏"
    ];
    
    const randomIndex = Math.floor(Math.random() * facts.length);
    return facts[randomIndex];
}

module.exports = getAnimalFact;
