"use strict"
// write your code here
class Model{
  constructor(){
    this._list="";
  }

  get list()
  {
    var fs = require('fs');
    var str = fs.readFileSync('data.json');
    var list = JSON.parse(str);
    this._list=list;
    return this._list;
  }


}

class Control{
  constructor(){
    this._model = new Model();
    this._view = new View();
    this._argv =[];
  }
  inputProcess()
  {
    let list = this._model.list;
    let benar=0;
    let i=0,salah=1;
    this._view.tampilPertanyaan(list[0]);
    this._view.rl.on('line', (input) => {



          if(input === list[i]["term"])
          {
            if(i!==list.length-1){

              this._view.tampilPertanyaanLanjutan(list[i+1]);
              this._view.rl.prompt();
              i+=1;
              salah=1;
            }
            else this._view.rl.close();
          }
          else
            {
              this._view.tampilPertanyaanLanjutan(list[i]);
              console.log(`\n\nsalah ${salah}\n`);
              this._view.rl.prompt();
              salah+=1;
            }
    }).on('close', () => {
      this._view.tampilPesanSelesai();
    });
  }
}

  class View{
    constructor(){
      this._rl="";
    }

    get rl()
    {
      return this._rl;
    }

    tampilPertanyaan(list){
      const readline = require('readline');
      this._rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: `${list["definition"]}: `
      });
      console.log("\n\n***********-SELAMAT BERMAIN FLASHCARDS-***********\n")
       this._rl.prompt();
     }

     tampilPertanyaanLanjutan(list){
       this._rl.setPrompt(`\n${list["definition"]}: `);
       this._rl.prompt();
     }

     tampilPesanSelesai()
     {
       console.log("\n\n***********-SELAMAT ANDA TELAH MENYELESAIKAN PERMAINAN-***********\n\n");
     }
}

  var ctr = new Control();
  // ctr.argvProcess();
  ctr.inputProcess();
  // ctr.inputProcess();

  //var model = new Model();
  //console.log(model.manipulasiOustanding())
