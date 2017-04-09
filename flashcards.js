"use strict"

const fs = require("fs")
const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout,
    prompt: ""
    })

class Model{
    constructor(){
      this.file = JSON.parse(fs.readFileSync("data.json","utf-8").toString())
    }

loadFile(){
    return this.file;
  }
}

class View{
    constructor(){
    }

init(){
    return "Welcome to JS Flash Cards. To play, just enter the correct term \n for each definition. Ready? Go!"
  }

displayCorrect(answer,result){
  console.log(`Guess: ${answer}`)
  if (result === true){
        console.log("Correct!")}
  else {
  console.log("Incorrect! Try again.")}
}

displayQuestion(question){
  console.log(question);
  }


menang(){
  console.log("Congratulation You Win!!");
  }
}

class Controller{
    constructor(){
      this.model = new Model();
      this.view = new View();
      this.quiz = this.model.loadFile();
      this.currentQuiz = 0;
    }


init(){
console.log(this.view.init())
rl.prompt();
rl.question("",(jawaban)=>{
  //view.displayQuestion(this.quiz[this.currentQuiz].definition);
    this.displayQuestion();
  })
}

displayQuestion(){
  this.view.displayQuestion(this.quiz[this.currentQuiz].definition);
  this.correctAnswer();
}

correctAnswer(){
  rl.question(``,(jawaban) =>{
    let jawab = jawaban;
    let result = jawab == this.quiz[this.currentQuiz].term;
    this.view.displayCorrect(jawab,result)
    if (result === true){
      this.currentQuiz+=1
      if(this.currentQuiz <= this.quiz.length-1){
      this.displayQuestion()
    }
      else {
        this.view.menang()
        rl.close()
      }
    } else {
      this.displayQuestion()
        }
      })
    }
  }

let game = new Controller();
game.init();
