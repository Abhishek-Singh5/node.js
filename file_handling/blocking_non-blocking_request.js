import { error } from 'console';
import fs from 'fs';
import os from 'os';

// Sync... Blocking-Request....
// fs.writeFileSync("./text.txt", "This is blocking Request");


// Async... Non - Blocking-Request....
// fs.writeFile("./text.txt", "This is non - blocking Request", (err) => {});



// console.log("1");

// // blocking request...
// const result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(result);

// console.log("2");




// console.log("1");

// // Non - blocking request...
// const result = fs.readFile("./contact.txt", "utf-8", (error, result) => {
// console.log(result);
// });

// console.log("2");
// console.log("3");
// console.log("5");
// console.log("8");


// Default Thread pool size = 4
// Max we can make depends upon the cpu-core
// Max? - 8core cpu -> 8 size thread pool


console.log(os.cpus().length);  // it gives your machine cpu-core length