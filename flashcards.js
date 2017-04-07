"use strict"
// write your code here


// load data.json
var fs = require('fs');


class Card {
  constructor (definition, term) {
    this._definition = definition;
    this._term = term;
  }
}

class FlashCard {
  constructor (file) {
    this._file = file;
    this._cards = [];

    this._show = new Show();
  }

  loadJsonFile() {
    let data = fs.readFileSync(this._file)
      .toString();

    // console.log(data);
    let json_data = JSON.parse(data);
    // console.log(json_data);
    // console.log(json_data[0]);
    this._cards = json_data;
  }

  initApp() {
    this.loadJsonFile();

  }

  practice() {
    this._show.printWelcomeMsg();

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    //
    // for(let i = 0 ; i < this._cards.length ; i++) {
    //   console.log("Definition");
    //   console.log(this._cards[i]['definition']);
    //   rl.question("Guess :", (input) => {
    //     if(input == this._cards[i]['term']) {
    //       console.log("Correct!");
    //     }
    //     else {
    //       console.log("Incorrect! Try again.");
    //     }
    //   })
    //
    // }

    let i = 0;

    console.log("Definition");
    console.log(this._cards[i]['definition']);
    rl.setPrompt("Guess: ");
    rl.prompt();

    rl.on('line', (input) => {
        if(input == this._cards[i]['term']) {
          console.log("Correct!");
          i += 1;
          console.log(`\nDefinition\n${this._cards[i]['definition']}\n`);
        }
        else {
          console.log("Incorrect! Try again\n");
        }

        rl.prompt();
    });
  } // end of practice

}

class Show {
  printWelcomeMsg() {
    console.log("Welcome to JS Flash Cards. To Play, just enter the correct term for each definition. Ready? Go!\n");
  }
}


let file = "data.json"
let fc = new FlashCard(file);

fc.initApp();
fc.practice();
