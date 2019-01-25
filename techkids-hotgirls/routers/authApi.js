const express = require('express');
const AuthApi = express.Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel')

AuthApi.post('/login', (req, res) => {
    const { username, password } = req.body;
    UserModel.findOne({ username: username })
        .then(userFound => {
            if(!userFound) res.send ({ error: "User does not exist!" })
            if(bcrypt.compareSync(password, userFound.password)) {
                res.send("Login successfully!!!");
            } else res.send("Wrong password!");
        })
        .catch(error => res.send(error)); // cách viết tắt
});

module.exports = AuthApi;