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
        .populate('author', '-_id -password -__v') // Loại bỏ _id, password và __v
        //.populate('author', { _id:0, password: 0, __v: 0}) // Cách thứ 2 loại bỏ _id, password, __V
        .populate('comments.author', '-_id -password -__v')
        .select('-password -__v')
        .skip((page-1)*Number(per_page)) 
        .limit(Number(per_page)) 
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
});
                                       
// create post
PostApi.post('/', (req, res) => {
    const { picture, description, like, title, comments, view, author } = req.body;
    const newPost = { picture, description, like, title, comments, view, author };
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



// update post
PostApi.put('/:postId', (req, res) => {
    const { postId } = req.params;
    const { like, title, comments, view, date, author } = req.body;
    PostModel.findById(postId)
    .then((postFound) => {
        if(!postFound) res.send ({ error: "User does not exist!" })
        else {
            try {
                if(picture) postFound.picture = picture;
                if(description) postFound.description = description;
                if(like) postFound.like = like;
                if(title) postFound.title = title;
                if(comments) postFound.comments = comments;
                if(view) postFound.view = view;
                if(date) postFound.date = date;
                if(author) postFound.author = author;
                return postFound.save();
            } catch (error) {
                console.log(error)
            }
        }
    })
    .then ((postUpdated) => {
        res.send({ data: postUpdated });
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