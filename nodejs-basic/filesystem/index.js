// TODO: tampilkan teks pada notes.txt pada console.
const fs = require('fs');
const path = require('path');

const fileReadCallback = (error, data) => {
    if(error) {
        console.log(error);
        return;
    }
    console.log(data);
};

let filePath = path.resolve(__dirname, 'notes.txt');
fs.readFile(filePath, 'UTF-8', fileReadCallback);

// Synchronous version
/* 
const data = fs.readFileSync('./filesystem/notes.txt', 'UTF-8');
console.log(data);
*/