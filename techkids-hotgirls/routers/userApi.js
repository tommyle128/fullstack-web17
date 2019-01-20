const express = require('express');
const UserApi = express.Router();
const UserModel = require('../models/userModel')

//Middleware
UserApi.use((req, res, next) => { // next laf chìa khóa đi qua
    
    next(); // cái này cho phép đi qua => cái này để kiểm tra ng dừng có login hoặc có quyền vào đó không
});

// CRUD - Create, Read, Update, Delete

// http://localhost:6699/api/users/?page=1

//Read all users
UserApi.get('/', (req, res) => {
    const { page=1, per_page=5 } = req.query;
    
    UserModel.find({})
        // .select({
        //     password: 1,
        //     __v: 1 // 1 là chọn, 0 là bỏ không hiện
        // })
        .select('-password -__v')
        .skip((page-1)*Number(per_page)) // bỏ qua số bản ghi tính từ đầu
        .limit(Number(per_page)) // lấy số bản ghi tính từ cái hết bỏ qua
        .then((users) => {
            res.send ({ data: users });
        })
        .catch((error) => {
            res.send( { error });
        });
    });


// read user by id
UserApi.get('/:userId', (req, res) => {
    const { userId } = req.params;
    UserModel.findById({ userId })
    .then((userFound) => {
        res.send ({ data: userFound });
    })
    .catch((error) => {
        res.send( { error });
    });
});

// create user
UserApi.post('/', (req, res) => {
    const { username, password, avatar } = req.body;
    const newUsers = { username, password, avatar };
    UserModel.init()
        .then(() => {
            return UserModel.create(newUsers);
        })
        .then((userCreated) => {
            res.send ({ data: userCreated });
        })
        .catch((error) => {
            res.send( { error });
        });
    });


// update user
UserApi.put('/:userId', (req, res) => {
    const { userId } = req.params;
    const { password, avatar } = req.body;
    UserModel.findById(userId)
    .then((userFound) => {
        if(!userFound) res.send ({ error: "User does not exist!" })
        else {
            if(password) userFound.password = password;
            if(avatar) userFound.avatar = avatar;
            return userFound.save();
        }
    })
    .then ((userUpdated) => {
        res.send({ data: userUpdated });
    })
    .catch((error) => {
        res.send( { error });
    });
});

// delete user
UserApi.delete('/:userId', (req, res) => {
    const { userId } = req.params;
    UserModel.findByIdAndRemove(userId)
        .then(() => {
            res.send({ data: "success" });
        })
        .catch((error) => {
            res.send({ error });
        });
});

module.exports = UserApi;