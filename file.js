const fs = require("fs");
const os = require("os");

// writeFile Syncronous call... Blocking...
// fs.writeFileSync("./text.txt", "Hello world");

// writeFile Asyncronous call... No-Blocking Req...

// fs.writeFile("./text.txt", "Hello world Asyn", (err) => {})
 
// Readfile c
// const result = fs.readFileSync("./contacts.text", "utf-8")

// console.log(result);

// Readfile Asyncronous call
//  fs.readFile("./contacts.text", "utf-8", (err, result) => {
// 	if(err){
// 		console.log("Error", err);
// 	}else{
// 		console.log(result);
// 	}
//  })

// appendfile Syncronous call
//  fs.appendFileSync("./text.txt", new Date().getDate().toLocaleString())

//  fs.appendFileSync("./text.txt", `${Date.now()} Hey There\n`)

//  fs.cpSync("./text.txt", "./copy.txt")

// fs.unlinkSync("./copy.txt")
// console.log(fs.statSync("./text.txt"))
// console.log(fs.statSync("./text.txt").isFile());
// fs.mkdirSync('my-docs' )
// fs.mkdirSync('my-docs/a/b', {recursive: true} )

console.log("1");

fs.readFile("./contacts.text", "utf-8", (err, result) => {console.log(result)})

console.log("2");
console.log("3");

// Defulte Thread Pool Size = 4
// Max? - 8core cpu 