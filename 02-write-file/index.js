const fs = require('fs');
const readline = require('readline');
const path = require('path');

const filePath = path.join(__dirname, 'output.txt');
const writableStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Hello! Type the text to be written to the file. Type “exit” to exit.');

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    rl.close();
    return;
  }

  writableStream.write(input + '\n', (err) => {
    if (err) {
      console.error('Error:', err.message);
    } 
  });
});

rl.on('close', () => {
  writableStream.end();
  console.log('Bye!');
});
