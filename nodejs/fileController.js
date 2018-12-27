const fs = require("fs");

// function readFile(filePath) {
//     const fileData = fs.readFileSync(
//         filePath,
//         { encoding: "utf-8" }
//     );
//     return fileData;
// }

function readFile(filePath, onReadFileDone) {
    fs.readFile(
        filePath, 
        { encoding: "utf-8"}, 
        (err, data) => {
            if(err) console.log(err)
            else {
                console.log("File data: ", data);   
                onReadFileDone(data); // onReadFileDone la 1 function
            }
        }
    );
}

function writeFile(filePath, fileData) {
    fs.writeFileSync(
        filePath,
        fileData,
        { encoding: "utf-8" }
    );
}

// module.exports= {  
//     readFile: readFile, // readFile la 1 key gia tri trong object, viet them 1 function thi phai them 1 key value moi o day
//     writeFile: writeFile // neu key value giong nhau thi chi can viet 1 cai khong can de dau :
// }

// viet ngan gon khi key va value trung ten nhau

module.exports={
    readFile,
    writeFile
}