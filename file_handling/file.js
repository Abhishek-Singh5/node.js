import { error } from 'console';
import fs from 'fs';

// Sync.... call
// fs.writeFileSync("./test.txt", "Hello Everyone My name is Abhishek");

// Async... call
// fs.writeFile("./test.txt", "Hello Everyone My name is Vishal", (error) => {})


// Sync... Read file
// const result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(result);


// Async... Read file
// fs.readFile("./contact.txt", "utf-8", (err, result) => {
//     if(err) {
//         console.log("Error", err);

//     }else{
//         console.log(result);
//     }
// })

fs.appendFileSync("./test.txt", ` ${Date.now()} Hii Guys \n`);

fs.cpSync("./test.txt", "./copy.txt");  // copy the whole file in another file

// fs.unlinkSync("./copy.txt");  // to delete the file

// console.log(fs.statSync("./test.txt"));   // properties of about file

console.log(fs.statSync("./test.txt").isFile()); // given boolean value file or not

// fs.mkdirSync("my_docs/"); // MAke the folder

fs.mkdirSync("my_docss/abhi/vishal", {recursive: true}); 