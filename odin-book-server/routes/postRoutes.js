const { Router } = require('express');
const postController = require('../controllers/postController.js');

const postRouter = Router();

postRouter.get('/', async (req, res) => {
    try {
        console.log('GET /api/posts called');
        const posts = await postController.getAllPosts();
        console.log('Got posts:', posts);
        res.json(posts);
    } catch (error) {
        console.error('Route error:', error.message, error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});



postRouter.post('/', async (req, res) => {
    try{
        const {content, authorId} = req.body;
        if(!content || !authorId){
            return res.status(400).json({error: 'Missing required fields: content, authorId'});
        }
        const newPost = await postController.createPost({content, authorId});
        res.status(201).json(newPost);
    }catch(error){
        console.error('Route error creating post:', error.message, error);
        res.status(500).json({ error: 'Failed to create post' });
    }  
});




module.exports = postRouter; 