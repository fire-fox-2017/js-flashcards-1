"use strict"
// write your code here
const fs = require('fs')
const readline = require('readline')

class Model {
  constructor(){
    this.data = JSON.parse(fs.readFileSync('data.json', 'UTF-8'))

  }
}
class View {
  constructor(){}

  question(question, nomor){
    console.log(`${question[nomor].definition}`);
  }
  userInput(input) {
    console.log(`jawaban anda : ${input}`);
  }
  jawabanBenar() {
    console.log(`jawaban anda benar`);
  }
  jawabanSalah() {
    console.log(`jawaban anda salah.. silahkan coba lagi.`);
  }
  selesai() {
    console.log(`terimakasih sudah bermain :D`);
  }
  clean() {
    console.log("\x1B[2J")
  }
}
class Controler {
  constructor(input) {
    this.input = input
    this.question = new Model().data
    this.view = new View()
    this.nomor = 0
  }
  start() {
    let view = this.view
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "masukan jawaban :"
    })

    // rl.setPrompt(`${this.question[this.nomor].definition}`)
    view.question(this.question, this.nomor)
    rl.prompt()

    rl.on('line', input => {
      view.userInput(input)
      if (input.toLowerCase() == this.question[this.nomor].term.toLowerCase()) {
        view.jawabanBenar()
        this.nomor++

        if (this.nomor < this.question.length) {
          // rl.setPrompt(`${this.question[this.nomor].definition}`)
          view.clean()
          view.question(this.question, this.nomor)
          rl.prompt()
        } else {
          view.clean()
          view.selesai()
          rl.close()
        }
      }
      else {
        view.jawabanSalah()
        if (this.nomor < this.question.length) {
          // rl.setPrompt(`${this.question[this.nomor].definition}`)
          view.clean()
          view.question(this.question, this.nomor)
          rl.prompt()
        }
      }
    })
  }
}
let game = new Controler()
game.start()
