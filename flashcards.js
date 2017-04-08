"use strict"
// write your code here
const fs = require('fs');
const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class flashCardView {
  constructor() {

  }

  showTitle() {
    console.log(`Welcome to JS Flash Cards. To Play, just enter the correct term for each definition. Ready? Go! \n`);
  }

  showListQuestion(listQuestion) {
    console.log(`Definiton`);
    console.log(`${listQuestion} \n`);
  }

  showAnswer(data){
    console.log(`Guess : ${data} `);
  }

  showTrueAnswer() {
    console.log('Correct !\n');
  }

  showWrongAnswer() {
    console.log('Incorrect! Try Again\n');
  }

  showQuitMessage(){
    console.log(`Selamat, anda telah menyelesaikan permainan ini`);
    rl.close();
  }
}

class flashCardController {
  constructor() {
    this._view = new flashCardView();
    this._model = new flashCardModel();
    this._numQuestion = 0;
  }

  startFlashCard() {
    this._view.showTitle();
    rl.question(``, (data) => {
      this.listQuestion();
    });

  }

  listQuestion() {
    var listQuestion = this._model.getListQuestion();
    this._view.showListQuestion(listQuestion[this._numQuestion].definition);
    this.inputAnswer();

  }

  inputAnswer() {
    rl.question(``, (dataAnswer) => {
      this.checkAnswer(dataAnswer);
    });
  }

  checkAnswer(dataAnswer) {
    var listQuestion = this._model.getListQuestion();
    this._view.showAnswer(dataAnswer);
    var answer = this._model.getAnswer(dataAnswer, this._numQuestion);
    // console.log(answer);
    if(this._numQuestion < listQuestion.length - 1){
      if(answer == true){
        this._view.showTrueAnswer();
        this._numQuestion++;
        console.log(this._numQuestion);
        this.listQuestion();
      } else {
        this._view.showWrongAnswer();
        this.listQuestion();
      }
    } else {
      this._view.showQuitMessage();
    }

  }




}

class flashCardModel {
  constructor() {
    this._data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  }

  getListQuestion() {
    return this._data;
  }

  getAnswer(dataAnswer, indeks) {
    var tmpAnswer = dataAnswer.toLowerCase();
    var realAnswer = this._data[indeks].term.toLowerCase();
    if(tmpAnswer == realAnswer){
      return true;
    } else {
      return false;
    }

  }
}

let app = new flashCardController();
app.startFlashCard();
