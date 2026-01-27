import { useState } from 'react';

export function CreatePost(){
    const [authorId, setAuthorId] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{

            const res = await fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    content: content.trim(),
                    authorId: parseInt(authorId, 10)
                })
            });
            if (!res.ok) {
                throw new Error('Failed to create post');
            }
            const newPost = await res.json();
            console.log(newPost);
            setContent('');
        }catch(err){
            console.error(err);
        }

    }
    
    return(
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        AuthorID:
                        <input type="number" value={authorId} onChange={(e) => setAuthorId(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Content:
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)} 
                            placeholder='Whats on your mind?'                                                
                        />
                    </label>
                </div>
                <button type='submit'>
                    Post
                </button>

            </form>
        </div>

    );
}
