"use strict"
const fs = require('fs')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
class flashCard {
  constructor(){
    this.qna=JSON.parse(fs.readFileSync('data.json', 'utf8'))
    this.num=0
  }
  question(q) {
        console.log(this.qna[q].definition)
  }
  quiz(){
    console.log('')
    if(this.num<this.qna.length){
      console.log('Definition')
      this.question(this.num)
      this.answer(this.num)
    } else {
      console.log("Congratulations!");
      rl.close();
    }
  }
  answer(num){
    console.log('')
    rl.question('Guess:', (answer) => {
      if(this.checkAnswer(num,answer)===false){
        console.log("Incorrect! Try again.")
        this.answer(num);
      } else {
        console.log("Correct!")
        this.num++;
        this.quiz();
      }
    });
  }
  checkAnswer(q,a){
      return a.toLowerCase() === this.qna[q].term.toLowerCase();
  }
  welcome(){
    console.log('Welcome to JS Flash Cards. To play, just enter the correct term for each definition. Ready? Go!')
  }
}

var fc = new flashCard();
fc.welcome()
fc.quiz();