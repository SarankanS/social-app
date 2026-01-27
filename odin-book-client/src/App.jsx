import { useState, useEffect } from 'react';
import { CreatePost } from './components/CreatePost';
import { Feed } from './components/Feed'

export function App() {
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

  const addPost = (newPost) =>{
    setPosts((prevPosts) => [newPost, ...prevPosts])
  };
  


  return (
    <>
      <h1>Hello</h1>
      <CreatePost onPostCreated={addPost}> </CreatePost>
      <Feed posts={posts}></Feed>
    </>
  );
}
