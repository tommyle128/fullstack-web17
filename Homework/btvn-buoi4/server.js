const express = require("express");
const app = express();

app.use(express.static("homepage"));
app.get("/", (request, response) => {
    response.send(__dirname + "index.html");
});

app.get("/about-me", (request, response) =>{
    response.sendFile(__dirname + "/cv/index.html");
});

app.listen(1208, (err) => {
    if (err) console.log(err);
    else console.log("Server start success!");
});
