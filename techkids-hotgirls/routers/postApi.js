const express = require('express');
const PostApi = express.Router();
const PostModel = require('../models/postModel');

//Middleware
PostApi.use((req, res, next) => {
    
    next(); 
});

// CRUD - Create, Read, Update, Delete

//Read all posts
PostApi.get('/', (req, res) => {
    const { page=1, per_page=5 } = req.query;
    
    PostModel.find({})
        // .select({
        //     password: 1,
        //     __v: 1 // 1 là chọn, 0 là bỏ không hiện
        // })
        .select('-password -__v')
        .skip((page-1)*Number(per_page)) // bỏ qua số bản ghi tính từ đầu
        .limit(Number(per_page)) // lấy số bản ghi tính từ cái hết bỏ qua
        .then((posts) => {
            res.send ({ data: posts });
        })
        .catch((error) => {
            res.send( { error });
        });
    });


// read post by id
PostApi.get('/:postId', (req, res) => {
    const { postId } = req.params;
    UserModel.findById({ postId })
    .then((postFound) => {
        res.send ({ data: postFound });
    })
    .catch((error) => {
        res.send( { error });
    });
});ê
                                       
// create post
PostApi.post('/:userId', (req, res) => {
    const { picture, description, like, title, comments, view, date, author } = req.body;
    const newPost = { picture, description, like, title, comments, view, date, author };
    PostModel.init()
        .then(() => {
            return PostModel.create(newPost);
        })
        .then((postCreated) => {
            res.send ({ data: postCreated });
        })
        .catch((error) => {
            res.send( { error });
        });
    });
});


// update post
PostApi.put('/:postId', (req, res) => {
    const { postId } = req.params;
    const { password, avatar } = req.body;
    PostModel.findById(PostId)
    .then((postFound) => {
        if(!postFound) res.send ({ error: "User does not exist!" })
        else {
            if(password) postFound.password = password;
            if(avatar) postFound.avatar = avatar;
            if(description) postFound.description = description;
            if(like) postFound.like = like;
            if(title) postFound.title = title;
            if(comments) postFound.comments = comments;
            if(view) postFound.view = view;
            if(date) postFound.date = date;
            if(author) postFound.author = author;
            return postFound.save();
        }
    })
    .then ((postUpdated) => {
        res.send({ data: userUpdated });
    })
    .catch((error) => {
        res.send( { error });
    });
});

// delete user
PostApi.delete('/:postId', (req, res) => {
    const { postId } = req.params;
    PostModel.findByIdAndRemove(postId)
        .then(() => {
            res.send({ data: "success" });
        })
        .catch((error) => {
            res.send({ error });
        });
});

module.exports = PostApi;