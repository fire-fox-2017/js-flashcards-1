const readline = require('readline');
const fs = require('fs');

class Quis{
  constructor(){
    this.soal= JSON.parse(fs.readFileSync('data.json', 'utf8'))
    this.indekSoal = 0;
  }

  pertanyaan(){
    const rl = readline.createInterface(
      {
        input: process.stdin,
        output: process.stdout,
        prompt: this.soal[this.indekSoal].definition+'\n'
      });

      rl.prompt();

      rl.on('line', (answer) => {
        if(answer.toLowerCase() == this.soal[this.indekSoal].term.toLowerCase()){
          this.indekSoal++;
          if(this.indekSoal>=this.soal.length){
            rl.close();
          }
          else{
            rl.setPrompt(this.soal[this.indekSoal].definition+'\n')
            rl.prompt();
          }
        }
        else{
          console.log('JAWABAN SALAH')
          rl.prompt();
        }
      });
  }
}

let kuis = new Quis()
kuis.pertanyaan();
