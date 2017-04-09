"use strict"
// write your code here

const fs = require('fs');

class Model {
    constructor() {
        this._listData = JSON.parse(fs.readFileSync('data.json', 'utf8'));


    }

    questionM() {
        for (let i = 0; i < this._listData.length; i++) {
            if (this._listData[i].answered == false) {
                return this._listData[i];
            }
        }

        return false;
    }

    setMark(tanya) {
        for (var i = 0; i < this._listData.length; i++) {

            if (this._listData[i].definition === tanya.definition) {
                this._listData[i].answered = true;
            }
        }


    }

    checkquestionM() {
        for (var i = 0; i < this._listData.length; i++) {

            if (this._listData[i].answered === false) {
                return true;
            }
        }
        return false;

    }



}

class View {
    constructor() {

    }

    welcomeV() {
        console.log(`welcome to JS Flash Cards. To play, just enter the corrent term for each definition. Ready? Go!`);

    }
    questionV(def) {
        console.log(def);
    }

    answerV(bool) {
        if (bool == true) {
            console.log(`Correct!`);

        } else {
            console.log(`Incorrect! Try again.`);

        }

    }
    endV() {
        console.log('Pertanyaan sudah habis, terima kasih sudah bermain')

    }


}

class Controller {
    constructor() {
        this._model = new Model();
        this._view = new View();


    }

    welcomeC() {
        this._view.welcomeV();

    }

    checkquestionC() {
        return this._model.checkquestionM()

    }

    questionC() {
        let tanya = this._model.questionM();
        if (tanya == false) {
            this._view.endV();

        } else {
            this._view.questionV(tanya.definition);
        }
    }

    answerC(string) {
        let tanya = this._model.questionM();
        if (tanya.term.toUpperCase() == string.toUpperCase()) {
            this._view.answerV(true);
            this._model.setMark(tanya);

        } else {
            this._view.answerV(false);

        }

    }
    checkquestionC() {
        return this._model.checkquestionM();
    }

    static init() {
        let app = new Controller;
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'Guess '
        });
        app.welcomeC();
        app.questionC();

        rl.prompt();
        rl.on('line', (line) => {
            line.trim()

            app.answerC(line);


            console.log('test');
            console.log(app.checkquestionC())

            if (app.checkquestionC() == true) {

                app.questionC();
                rl.prompt();
            } else {
                app.questionC();
                rl.close();
            }

        }).on('close', () => {
            console.log('bye bye!');
            process.exit(0);
        });


    }
}

Controller.init();
