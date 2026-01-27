import { useState, useEffect } from 'react';

export function Feed(){

    const [posts, setPosts] = useState([]);
    
    const fetchPosts = async () =>{
        
        try{
            const res = await fetch('http://localhost:3000/api/posts');
            if (!res.ok){
                throw new Error("Failed to get Posts");
            }
            const data = await res.json();
            console.log(data);
            setPosts(data);
    
        }catch(err){
            console.error("Failed to get Posts");
        }
    }

    useEffect(()=>{
        fetchPosts();
    }, []);


    return (
      <div>
        <h2>Feed</h2>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <strong>Post {post.id}</strong> by Author {post.authorId}
                <p>{post.content}</p>
                <small>{new Date(post.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}