const readline = require('readline');

const questions = [
  { question: "What is the nickname of New York City?", options: ["The Big Apple", "The Windy City", "The City of Lights", "The Golden City"], answer: "The Big Apple" },
  { question: "Which famous statue stands in New York Harbor?", options: ["The Statue of Liberty", "The Eiffel Tower", "Christ the Redeemer", "Big Ben"], answer: "The Statue of Liberty" },
  { question: "Which borough is the largest by area?", options: ["Manhattan", "Brooklyn", "Queens", "The Bronx"], answer: "Queens" }
];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let score = 0;
let currentQuestion = 0;
const totalTime = 30;

const startQuiz = () => {
  console.log("Welcome to the NYC Trivia Quiz! You have 30 seconds to complete the quiz.\nLet's start!\n");
  startTimer(totalTime);
  askQuestion();
};

const askQuestion = () => {
  if (currentQuestion >= questions.length) return endGame();

  const { question, options, answer } = questions[currentQuestion];
  console.log(`${currentQuestion + 1}. ${question}`);
  options.forEach((option, index) => console.log(`${index + 1}. ${option}`));

  rl.question('Your answer (1-4): ', (input) => {
    const selectedOption = options[parseInt(input) - 1];
    console.log(selectedOption === answer ? "✅ Correct!\n" : `❌ Wrong! The correct answer was: ${answer}\n`);
    if (selectedOption === answer) score++;
    currentQuestion++;
    askQuestion();
  });
};

const startTimer = (time) => {
  const timerInterval = setInterval(() => {
    console.log(`⏳ Time remaining: ${--time}s`);
    if (time <= 0) {
      console.log("⏰ Time's up!");
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
};

const endGame = () => {
  console.log(`🎉 Quiz Over! Your score: ${score}/${questions.length}`);
  rl.close();
};

startQuiz();
