import { useState, useEffect } from 'react';

export function Feed({posts}){

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