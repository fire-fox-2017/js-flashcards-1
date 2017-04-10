"use strict"
// write your code here
const fs = require('fs');
const readline = require('readline');
let data = JSON.parse(fs.readFileSync('data.json'));
const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout,
  prompt : 'Jawaban anda > '
})

class Flashcard {
  constructor(data) {
    this._file = data;
    this._question = 0;
    this._point = 0;
  }

  start(){
    console.log(`Are you smarter than a 5th grader?\nGeneral Rule: Jawaban hanya 1 kata`);
    this.question();
    rl.on('line', (line)=>{
      if(line.toLowerCase().trim() === this.cek().toLowerCase()){
        if(this._question !== this._file.length-1){
          console.log('==============================================================================');
          console.log(this._question,this._file.length);
          this._question += 1;
          this._point += 4;
          this.question();
        } else {
          console.log('==============================================================================');
          this._point+=4
          this.finish();
          rl.close();
        }
      } else {
        console.log(`==============================================================================\nAnda salah, coba lagi`);
        this._point -= 1;
        this.question();
      }
    })
  }

  question(){
    if(this._point>=0){
      console.log(`Poin anda ${this._point}\nQuestion ${this._question+1}: ${this._file[this._question].definition}`);
      rl.prompt();
    } else {
      console.log(`==============================================================================\nPoin anda ${this._point}\nBubar aja lah, poin udah negatif tuh :p\nBelajar lebih rajin lagi yah`);
      rl.close();
    }
  }

  cek(){
    return this._file[this._question].term;
  }

  finish(){
    if(this._point===24){
      console.log(`Selamat! Anda brilian! (Point: ${this._point})`);
    } else if(this._point>=18){
      console.log(`Lumayan laah, ga bego-bego amat  (Points: ${this._point})`);
    } else {
      console.log(`Lulusnya cuma modal hoki (Points: ${this._point})`);
    }
  }
}


let flash = new Flashcard(data)
flash.start()
