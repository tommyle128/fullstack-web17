// // console.log("ABC");

// //  const let var
// // const constVariable = "ABC";
// // constVariable = "XYZ";

// // let variable ="12345"
// // console.log(typeof variable);
// // variable = 5;
// // console.log(typeof variable);
// // variable = true;
// // console.log(typeof variable);

// // const obj = {
// //     name: "Huy",
// //     age: 18
// // };
// // console.log(typeof obj);
// // console.log(obj);

// // console.log(obj.name);
// // console.log(obj['age']);

// // obj.lastName = "Huynh";
// // obj["firstName"] = "Huy";
// // obj.age +=1;
// // console.log(obj);

// // console.log(`let's
// // go
// // now`);

// // console.log("Minh ten la " + obj.name);
// // console.log(`Minh ten la ${obj.name}`); 

// // console.log(arr.length)

// let arr = [1, 2, 3, "123", true, {name: "Tu"}];
// console.log(arr);

// for(let i = 0; i < arr.length; i++) {
//     let item = arr[i];
//     console.log(item);
// }

// arr.forEach(function(item, index, array) {
//     console.log(item, index, array);
// });

// console.log(arr.map(function(item){  // .map de tra ve gia tri moi
//     return item*2;
// }));

// const param1 = "A";
// const param2 = "B";

// function functionA(param1, param2) {
//     console.log(param1);
//     console.log(param2);
// }

// functionA(param1, param2);

// const functionB = function () {
//     console.log("Hello");
// }

// functionB();

// const functionC = () => { //kieu moi co y nghia giong functionB
//     console.log("Hello");
// }

// functionC();

// function scope

// var a = 5;

// function print() {
//     var b = 10;
//     console.log(a); // 5
//     console.log(b); // 10
// }
// print();

// console.log(a); // 5
// console.log(b); // undefined

// setTimeout(function(){   
//     console.log("Abc");
// }, 3000);  // chờ hết 3000 miliseconds thì mới log ra 

// function print(num, waitTime) {
//     setTimeout(function(){
//         console.log(num);
//     }, waitTime*1000)
// }

// function countDown(count) {
//     for(var i = count; i >= 0; i--) {
//         // i == -1 
//         // console.log(i);
//         print(i, count - i);
        
//         // setTimeout(function(){
//         //     console.log(i);
//         // }, (count-i)*1000);  // chay 5 luong countdown 1 luc
//     }
// }

// countDown(5); // dem nguoc tu 5 ve 0 va 

// async await // Lam cho code hien thi dong bo nhung ban chat bat dong bo

// function callback(result) {
//     console.log(result);
// }

// function print(onWaitDone) {
//     let result = 1 + 1;
//     setTimeout (function() {
//         onWaitDone(result);
//     }, 1000);
// }

// console.log("Start");
// print(callback);

var a = 5
var target = 3
if (a != target) {
    console.log("ok");
}