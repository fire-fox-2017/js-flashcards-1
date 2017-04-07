const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.setPrompt("Guess: ");
rl.prompt();

rl.on('line', (input) => {
  console.log("haha");
  rl.close();
}).on('close', () => {
  console.log('rl close');
});
