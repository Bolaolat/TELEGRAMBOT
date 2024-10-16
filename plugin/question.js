// plugin/question.js

function getQuestion() {
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["A) London", "B) Paris", "C) Rome", "D) Berlin"],
            answer: "B" // Correct answer
        },
        {
            question: "What is 2 + 2?",
            options: ["A) 3", "B) 4", "C) 5", "D) 6"],
            answer: "B"
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["A) Harper Lee", "B) J.K. Rowling", "C) F. Scott Fitzgerald", "D) Mark Twain"],
            answer: "A"
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["A) Earth", "B) Jupiter", "C) Saturn", "D) Mars"],
            answer: "B"
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            options: ["A) Gold", "B) Oxygen", "C) Osmium", "D) Silver"],
            answer: "B"
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["A) Vincent van Gogh", "B) Pablo Picasso", "C) Leonardo da Vinci", "D) Claude Monet"],
            answer: "C"
        },
        {
            question: "What is the smallest country in the world?",
            options: ["A) Monaco", "B) Vatican City", "C) Nauru", "D) Tuvalu"],
            answer: "B"
        },
        {
            question: "What is the capital of Japan?",
            options: ["A) Beijing", "B) Seoul", "C) Tokyo", "D) Bangkok"],
            answer: "C"
        },
        {
            question: "In what year did the Titanic sink?",
            options: ["A) 1910", "B) 1912", "C) 1914", "D) 1916"],
            answer: "B"
        },
        {
            question: "Which gas do plants absorb from the atmosphere?",
            options: ["A) Oxygen", "B) Nitrogen", "C) Carbon Dioxide", "D) Hydrogen"],
            answer: "C"
        },
        {
            question: "What is the tallest mountain in the world?",
            options: ["A) K2", "B) Kangchenjunga", "C) Lhotse", "D) Mount Everest"],
            answer: "D"
        },
        {
            question: "What is the main ingredient in guacamole?",
            options: ["A) Tomato", "B) Avocado", "C) Onion", "D) Pepper"],
            answer: "B"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["A) Venus", "B) Mars", "C) Mercury", "D) Jupiter"],
            answer: "B"
        },
        {
            question: "Who is known as the father of modern physics?",
            options: ["A) Isaac Newton", "B) Albert Einstein", "C) Galileo Galilei", "D) Niels Bohr"],
            answer: "B"
        },
        {
            question: "What is the most spoken language in the world?",
            options: ["A) English", "B) Mandarin", "C) Spanish", "D) Hindi"],
            answer: "B"
        },
        {
            question: "What is the longest river in the world?",
            options: ["A) Amazon River", "B) Nile River", "C) Yangtze River", "D) Mississippi River"],
            answer: "B"
        },
        {
            question: "What is the capital of Australia?",
            options: ["A) Sydney", "B) Melbourne", "C) Canberra", "D) Brisbane"],
            answer: "C"
        },
        {
            question: "Which organ in the human body is responsible for pumping blood?",
            options: ["A) Brain", "B) Liver", "C) Heart", "D) Lung"],
            answer: "C"
        },
        {
            question: "What is the currency of Japan?",
            options: ["A) Yen", "B) Won", "C) Dollar", "D) Euro"],
            answer: "A"
        },
        {
            question: "In which year did World War II end?",
            options: ["A) 1945", "B) 1946", "C) 1944", "D) 1943"],
            answer: "A"
        },
        {
            question: "What is the chemical formula for water?",
            options: ["A) H2O", "B) CO2", "C) O2", "D) NaCl"],
            answer: "A"
        },
        {
            question: "Who discovered penicillin?",
            options: ["A) Louis Pasteur", "B) Alexander Fleming", "C) Marie Curie", "D) Edward Jenner"],
            answer: "B"
        }
    ];

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    return randomQuestion;
}

module.exports = { getQuestion };