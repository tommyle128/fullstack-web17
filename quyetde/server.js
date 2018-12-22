const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs"); // fs la file system
const app = express(); // app chinh la web server cua minh


//request co method GET toi duong dan: http://localhost:6969/
app.get("/", (req, res) => {  // 1 request tra ve 1 response
    // response.send(JSON.stringify({a: 5, b: 10}));
    // response.send("Hello world!"); // Lỗi HTTP_HEADERS_SENT là do có từ 2 response trở lên cho 1 request
    // response.send("<h1> Hello world bold</h1>");
    const questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8"}));
    if (questions.length == 0) res.send("Chưa có câu hỏi nào")
    else{
        var randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        res.send(`<h1> ${randomQuestion.content} </h1>
            <form method="POST" action="vote/${randomQuestion.id}">
                <button type="submit" name="vote" value="y">Đúng/Có/Phải</button>
                <button type="submit" name="vote" value="n">Sai/Không/Trái</button>
            </form>` 
        ); 
    }
});



//Y nghia $: "abc" + variable + "xyz" == `abc${variable}xyz` 

app.get("/ask", (req, res) => {
    res.sendFile(__dirname + "/view/ask.html");
});

app.use(bodyParser.urlencoded({ extended: false})); // Library dung dau tien de don duoc cac thu dang toi

app.post("/addquestion", (req, res)  => {
    const questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8"}));
    console.log(questions);
    const newQuestion = {
        content: req.body.questionContent,
        yes: 0,
        no: 0,
        id: questions.length
    };
    questions.push(newQuestion);
    console.log(questions);
    fs.writeFileSync("./questions.json", JSON.stringify(questions));
    res.redirect("/");
});

app.post("/vote/:id", (req, res, next) => {
    const questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8"}));
    for (i = 0; i < questions.length; i++) { 
        if (questions[i].id == req.params.id) {
            var locatedQuestion = questions[i];
            console.log(locatedQuestion); // check question before changing yes / no
            if (req.body.vote == "y") {
                locatedQuestion.yes += 1;
            } else if (req.body.vote == "n") {
                locatedQuestion.no += 1;
            };
            console.log(locatedQuestion); // check question after changing yes / no
            break;
        };
    };
    fs.writeFileSync("./questions.json", JSON.stringify(questions));
    res.redirect("/");
});




//https://localhotst:6969/....


// app.get("/about", (request, response) => {
//     // Show ra trang CV => BTVN và file CV có đủ CSS
//     response.sendFile(__dirname + "/resource/a.html");
// });

// // app.get("/style.css", (request, response) =>{
// //     response.sendFile(__dirname + "/resource/style.css");
// // });

// //app.use(express.static("resource")); // Nen de o duoi

// app.use("/about", express.static("resource"));
app.use("/public", express.static("public"));

app.listen(6969, (err) => {
    if (err) console.log(err)
    else console.log("Server started successfully");
});