"use strict"
// write your code here

const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Guess: "
});

class FlashCard {
  constructor(quizFile) {
    this.quiz = JSON.parse(fs.readFileSync(quizFile));
    this.index = 0;
  }

  initApp() {
    console.log("Welcome to JS Flash Cards. To Play, just enter the correct term or each definition. Ready? Go!");
    this.flashing();
  }

  flashing(quizIndex = 0) {
    let index = quizIndex;
    if (quizIndex < this.quiz.length) {
      console.log("\nDefinition: ");
      console.log(this.quiz[index].definition + "\n");
      rl.prompt();
      rl.question("Guess: ", (guess) => {
        if (this.answerCheck(index, guess)) {
          console.log("Correct!");
          index ++;
          this.flashing(index);
        } else {
          console.log("Incorrect! Try Again.\n");
          this.flashing(index);
        }
      });
    } else {
      console.log("\nCongratulation, you have answered all the questions!");
      process.exit();
    }

  }

  answerCheck(questionIndex, answer) {
    if (this.quiz[questionIndex].term.toLowerCase() === answer.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  }

}


let flash = new FlashCard("data.json");
flash.initApp();
