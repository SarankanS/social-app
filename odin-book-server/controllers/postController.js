const db = require("../db/models/posts");

async function getAllPosts() {
    try {
        const posts = await db.getAllPosts();
        return posts;
    } catch (error) {
        console.error("Error fetching posts in controller:", error.message, error);
        throw error;
    }
}

async function createPost({content, authorId}) {
    try{
        const post = await db.createPost({content, authorId});
        return post;
    }catch(error){
        console.error("Error creating post in controller:", error.message, error);
        throw error;
    }
}



module.exports = {
    getAllPosts,
    createPost,
};