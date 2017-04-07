"use strict"
const fs = require('fs');
const readline = require('readline');
let data = JSON.parse(fs.readFileSync('data.json','ascii'))

// console.log(typeof data);

class Flashcard {
  constructor(data) {
    this.file = data
    // this.check = ''
    this._next = 0
    this._correct = 0
  }

  welcome(){
    console.log(`\n***Welcome to JS Flash Cards. To play, just enter the correct term for each definition. Ready? GO!***\n`);
  }

  question(){
    console.log(`Question: ${this.file[this._next].definition}`);
  }

  checkAnswer(){
    return this.file[this._next].term
  }

  result(){
    console.log(`Congratulation You Win!!!`);
  }

  set nextquest(input){
    this._next += input
    // return this.next
  }
  set correct(value){
    this._correct += value
  }
}


const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout,
  prompt : 'Guess > '
})
// write your code here
let flash = new Flashcard(data)
flash.welcome()
flash.question()
rl.prompt()
// console.log(typeof flash.checkAnswer());

// rl.close()
rl.on('line', (line)=>{
  if(line.toLowerCase() == flash.checkAnswer().toLowerCase() && flash._next != flash.file.length){
    // flash.correct = 1
    flash.nextquest = 1
    if(flash._next != flash.file.length){
      flash.question()
      rl.prompt()
    } else {
      flash.result()
      rl.close()
    }
  } else {
    // flash.nextquest = 1
    console.log(`You Wrong Answer Try Again!!!`);
    if(flash._next != flash.file.length){
      flash.question()
      rl.prompt()
    }
    // else {
    //   flash.result()
    //   rl.close()
    // }
  }
})
