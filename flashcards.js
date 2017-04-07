"use strict"
// write your code here
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let strJson = fs.readFileSync('data.json');
let str = JSON.parse(strJson);
let i = 0;

let ask = (i) => {
    if (i < str.length) {
        let strAsk = `${str[i].definition}  \nGuess : `;
        rl.question(strAsk, (answer) => {
            if (answer.toUpperCase() == str[i].term) {
                console.log(`Correct! \n`);
                i++;
                return ask(i);
            } else {
                console.log(`Incorrect! Try again.\n`);
                return ask(i);
            }
        });
    } else {
        console.log("Congrulation Task Complete");
        rl.close();
    }
}

ask(i);
