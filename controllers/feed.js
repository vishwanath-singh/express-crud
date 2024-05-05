const {validationResult} = require('express-validator');
const Post = require('../models/posts');

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.findAll()
        res.status(200).json({posts});
    }
    catch {
        res.status(500).json({error:'Failed to fetch post'})
    }   
}

exports.getPostById = async (req, res, next) => {
    const postId = req.params.id;
    try {
        const post = await Post.findByPk(postId)
        res.status(200).json(post)
    }
    catch {
        res.status(500).json({error:'Failed to fetch post'})
    } 
}

exports.createPost = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({message:'Validation failed, entered data is incorrect', errors:errors.array()})
    }
    const title = req.body.title;
    const content = req.body.content;
    //create post in db
    try{
        const post = await Post.create({title, content, creator: {name:'Max'}})
        res.status(201).json({
            message:'Post created successfully',
            post
        })
    }
    catch {
        res.status(500).json({error:'Failed to created post'})
    } 
}

exports.editPost = async (req, res, next) => {
    const postId = req.params.id;
    const {title, content} = req.body;
    try{
        const [updatedRows] = await Post.update({title, content}, {where: {_id:postId}});

        if(updatedRows>0) res.status(200).json({message:'Post updated successfully'})
        else res.status(404).json({error:'Post not found'})
    }
    catch {
        res.status(500).json({error:'Failed to edit post'})
    }
}

exports.deletePost = async (req, res, next) => {
    const postId = req.params.id;
    try {
        const deletedRows = await Post.destroy({where: {_id:postId}});

        if(deletedRows>0) res.status(200).json({message:'Post deleted successfully'})
        else res.status(404).json({error:'Post not found'})
    }
    catch {
        res.status(500).json({error:'Failed to delete post'})
    }
}