const fs = require('fs');

const fileController = require("./fileController"); // export cai gi ra thi require cai do
// console.log(fileController) 
// console.log(fileController.readFile("hello.txt"));
const readFile = fileController.readFile;
// const { readFile } = fileController; // cai o duoi giong het o tren nghia la lay readFile o fileController gan vao bien readFile

// console.log(readFile("hello.txt"));

// const obj={
//     a: 10,
//     b: 15,
//     c: 25
// }

// const { a, b, c, d=10 } = obj;
// console.log(a, b, c, d);

readFile("hello.txt", (fileData) => {
    console.log("Hello", fileData);
});


// //     else console.log("Write file successfully");
// // })
// // console.log("End");

// // fs.writeFileSync("testSync.txt", "Hello sync");

// // console.log("Begin");
// // fs.readFile("hello.txt", { encoding: "utf-8"}, (err, data) => {
// //     if(err) console.log(err)
// //     else console.log("File data: ", data);  // để dấu , mà k có encoding thì ra dạng buffer nếu trên có thêm encoding:"utf-8" 
// // })
// // console.log("End");

function aRose(cb) {
    // do some thing
    cb()
}

function after() {

}

aRose(function() {

    after()
})



// const objectData = {
//     name: "Huy",
//     age: 18
// }

// fs.writeFileSync("hello.txt", JSON.stringify(objectData)); //JSON.stringify chuyen object thanh string

// console.log("Begin");
// const readDataSync = fs.readFileSync("hello.txt", { encoding: "utf-8"}); // cần phải gán vào 1 biến
// const parseData = JSON.parse(readDataSync);
// console.log("File Data Sync: ", parseData.name); // convert ngược từ dạng JSON về object
// console.log("End");
