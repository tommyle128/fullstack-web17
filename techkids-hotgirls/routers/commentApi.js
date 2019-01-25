const express = require('express');
const PostApi = express.Router();
const PostModel = require('../models/postModel');

//Read all posts
PostApi.get('/', (req, res) => {
    const { page=1, per_page=5 } = req.query;
    
    PostModel.find({})
        .populate('comment.author', '-_id -password -__v') // Loại bỏ _id, password và __v
        //.populate('author', { _id:0, password: 0, __v: 0}) // Cách thứ 2 loại bỏ _id, password, __V
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