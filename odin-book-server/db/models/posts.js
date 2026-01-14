const pool = require("../pool");

async function getAllPosts() {
    try{
        const result = await pool.query('SELECT * FROM "Post" ORDER BY "createdAt" DESC');
        return result.rows;
    }catch (error){
        console.error("Error fetching posts:", error);
        throw error;
    }        
}

async function createPost({content, authorId}){
    try{
        const result = await pool.query(
            `INSERT INTO "Post" (content, "authorId", "createdAt") VALUES ($1, $2, NOW()) RETURNING *`,
            [content, authorId]
        );
        return result.rows[0];

    }catch(error){
        console.error("Error creating post:", error);
        throw error;
    }
}

module.exports = {
    getAllPosts,
    createPost,
};