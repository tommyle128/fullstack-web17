const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const UserApi = require('./routers/userApi')
const PostApi = require('./routers/postApi')
const AuthApi = require('./routers/authApi')

const app = express ();

mongoose.connect('mongodb://localhost/tk-hotgirlls',
    { useNewUrlParser: true },
    (err) => {
    if (err) console.log(err)
    else console.log('DB connects successfully!');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', UserApi);
app.use('/api/posts', PostApi);
app.use('/api/auth', AuthApi);


app.listen(6699, (err) => {
    if (err) console.log(err)
    else console.log("Server started successfully!");
});