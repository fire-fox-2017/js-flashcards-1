"use strict"
// write your code here
const fs = require('fs')
const readline = require('readline')
const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout,
  prompt : "Guess : "
})

class FlashCards{
  constructor(data){
    this.data = data
  }
  start(){
    console.log(`Welcome to JS Flash Cards. To play, just enter \nthe correct term for each definition. Ready? Go!\n`);
    cards.quest()
  }
  quest(num=0){
    if(num == this.data.length){
      console.log("Pertanyaan Sudah Habis");
      rl.close()
    }else{
      rl.prompt()
      rl.question(this.data[num].definition+"\n", (answer) => {
        var regex = /([A-Z1-9])\w+/g
        if(this.data[num].term === answer){
          console.log(`Correct !`);
          cards.quest(num+1)
        }else{
          console.log(`Incorrect ! Try Again..`);
          cards.quest(num)
        }
      })
    }
  }
}

var objData = JSON.parse(fs.readFileSync('data.json','utf-8'))
var cards = new FlashCards(objData)
cards.start()
