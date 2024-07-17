const { error } = require("console");
const fs = require("fs")
//synchornous
// fs.writeFileSync('./test.txt', "How are you?");
// fs.writeFileSync('./test.txt', "Hello world");

// async
// fs.writeFile("./test.txt","Hello world async",(err)=>{});
// const contact = fs.readFileSync('./contact.txt', 'utf8');
// console.log(contact);
// fs.readFile("./contact.txt","utf-8",(err,result) =>{
// if(err){
//   console.log("Error reading",err)
// }
// else{
//   console.log(result);
// }
// });

fs.appendFileSync('./contact.txt',`\nI am here from ${Date.now()} `)