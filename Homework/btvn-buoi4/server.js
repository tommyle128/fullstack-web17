const express = require("express");
const app = express();
var path = require("path");

app.get("/", (request, response) => {
    console.log(__dirname);
    response.send("Homepage");
});

//Nap du lieu cua thu muc CV:
app.use(express.static(path.join(__dirname, "cv")));
// Function chay file index.html trong thu muc CV:
app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname + '/cv/index.html'));
});

app.listen(1208, (err) => {
    if (err) console.log(err);
    else console.log("Server start success!");
});


