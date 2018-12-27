const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs"); // fs la file system
const app = express(); // app chinh la web server cua minh
var path = require("path");


//request co method GET toi duong dan: http://localhost:6969/
app.get("/", (req, res) => {  // 1 request tra ve 1 response
    // response.send(JSON.stringify({a: 5, b: 10}));
    // response.send("Hello world!"); // Lỗi HTTP_HEADERS_SENT là do có từ 2 response trở lên cho 1 request
    // response.send("<h1> Hello world bold</h1>");
    const questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8"}));
    if (questions.length == 0) res.send("Chưa có câu hỏi nào")
    else{
        var randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        // res.send(`<h1> ${randomQuestion.content} </h1>  // Server rendering
        //         <a href="/vote/${randomQuestion.id}/yes"><button>Đúng/Có/Phải</button>
        //         <a href="/vote/${randomQuestion.id}/no"><button>Sai/Không/Trái</button>
        //     ` 
        // ); 
        res.sendFile(__dirname + "/view/answer.html"); // Client rendering
    }
});

app.get("/api/random", (req, res) => {
    const questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8"}));
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    res.send({ question: randomQuestion });
});

app.get("/api/result/:questionId", (req, res) => {
    const questionId = req.params.questionId;
    let questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8"}));
    questions.forEach((question, index) => {
        if(question.id == questionId) {
            questionContent = question.content;
            totalVotes = questions[index].yes + questions[index].no;
            if (totalVotes != 0) {
                yesPercentage = ((questions[index].yes / totalVotes)*100).toFixed(2);
                noPercentage = (100 - yesPercentage).toFixed(2);
            } else {
                yesPercentage = 50;
                noPercentage = 50;
            }
        };
    });
    // console.log(totalVotes);
    // console.log(yesPercentage);
    // console.log(noPercentage);
    res.send ({ questionContent: questionContent,
                totalVotes: totalVotes,
                yesPercentage: yesPercentage,
                noPercentage: noPercentage
    });
});

{/* <form method="POST" action="vote/${randomQuestion.id}">
    <button type="submit" name="vote" value="y">Đúng/Có/Phải</button>
<button type="submit" name="vote" value="n">Sai/Không/Trái</button> 
</form>*/}

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

// app.post("/vote/:id", (req, res, next) => {
//     const questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8"}));
//     for (i = 0; i < questions.length; i++) { 
//         if (questions[i].id == req.params.id) {
//             var locatedQuestion = questions[i];
//             console.log(locatedQuestion); // check question before changing yes / no
//             if (req.body.vote == "y") {
//                 locatedQuestion.yes += 1;
//             } else if (req.body.vote == "n") {
//                 locatedQuestion.no += 1;
//             };
//             console.log(locatedQuestion); // check question after changing yes / no
//             break;
//         };
//     };
//     fs.writeFileSync("./questions.json", JSON.stringify(questions));
//     res.redirect("/");
// });

// app.get("/vote/:questionId/yes", (req, res) => {
//     const questionId = req.params.questionId;
//     let questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8"}));
//     questions.forEach((question, index) => {  // vong forEach ((item, index, arr) => {} )
//         if(question.id == questionId) {
//             questions[index].yes += 1;
//         }
//     });
//     fs.writeFileSync("./questions.json", JSON.stringify(questions));
//     res.redirect("/");
//     //console.log(req.params.questionId); // co the cho nhieu param vao cu them /:tenParameter
// });

// app.get("/vote/:questionId/no", (req, res) => {
//     const questionId = req.params.questionId;
//     let questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8"}));
//     questions.forEach((question, index) => {  // vong forEach ((item, index, arr) => {} )
//         if(question.id == questionId) {
//             questions[index].no += 1;
//         }
//     });
//     fs.writeFileSync("./questions.json", JSON.stringify(questions));
//     res.redirect("/");
// });

app.get("/vote/:questionId/:vote", (req, res) => {
    const questionId = req.params.questionId;
    const vote = req.params.vote;
    let questions = JSON.parse(fs.readFileSync("./questions.json", { encoding: "utf-8"}));
    questions.forEach((question, index) => {  // vong forEach ((item, index, arr) => {} )
        if(question.id == questionId) {
            // if (vote == "yes") questions[index].yes += 1
            // else questions[index].no += 1;

            questions[index][vote] += 1; // nó sẽ lấy đúng questions[index]["yes"] hoặc questions[index]["no"]
        }
    });
    fs.writeFileSync("./questions.json", JSON.stringify(questions));
    res.redirect("/");
});


app.get("/question/:questionId", (req, res) => {
    res.sendFile(__dirname + "/view/question.html");
});

app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/view/style.css");
});

//https://localhotst:6969/....


// app.get("/about", (request, response) => {
//     // Show ra trang CV => BTVN và file CV có đủ CSS
//     response.sendFile(__dirname + "/resource/index.html");
// });

// app.get("/style.css", (request, response) =>{
//     response.sendFile(__dirname + "/resource/style.css");
// });

app.use(express.static("resource")); // Nen de o duoi

// app.use("/about", express.static("resource"));
app.use(express.static("view"));
app.use("/public", express.static("public"));

app.listen(6969, (err) => {
    if (err) console.log(err)
    else console.log("Server started successfully");
});