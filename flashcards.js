"use strict"
const fs = require('fs');
const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Model {
  constructor () {
    this.file = JSON.parse(fs.readFileSync('data.json', 'utf-8').toString());
  }

  load () {
    return this.file;
  }
}

class View {
  constructor () {

  }

  init () {
    console.log(`Welcome to JS Flash Cards.\nTo play, just enter the correct term for each definition. Ready? Go`);
  }

  displayQuestion (question) {
    console.log(question);
  }

  displayAnswer (answer) {
    console.log(`Guess: ${answer}`);
  }

  displayCorrection (result) {
    if (result) {
      console.log(`Correct!`)
    } else {
      console.log(`Incorrect! Try again.`)
    }
  }

  terminate () {
    console.log(`Congratulations! You answered all the questions correctly.`)
    rl.close();
  }
}

class Controller {
  constructor () {
    this.model = new Model();
    this.view = new View();
    this.quizzes = this.model.load();
    this.current = 0;
  }

  init () {
    this.view.init();
    rl.question(``, (data) => {
      this.displayQuestion();
    })
  }

  displayQuestion () {
    this.view.displayQuestion(this.quizzes[this.current].definition);
    this.inputAnswer();
  }

  inputAnswer () {
    rl.question(``, (data) => {
      this.correctAnswer(data);
    });
  }

  correctAnswer (data) {
    this.view.displayAnswer(data);
    let result = data.toLowerCase() == this.quizzes[this.current].term.toLowerCase();
    this.view.displayCorrection(result);
    if (result) {
      this.current++;
      if (this.current < this.quizzes.length) {
        this.displayQuestion();
      } else {
        this.view.terminate();
      }
    } else {
      this.inputAnswer();
    }
  }
}

let game = new Controller();
game.init();
