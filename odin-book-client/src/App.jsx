import { useState } from 'react';
import { CreatePost } from './components/CreatePost';
import { Feed } from './components/Feed'

export function App() {


  return (
    <>
      <h1>Hello</h1>
      <CreatePost></CreatePost>
      <Feed></Feed>
    </>
  );
}
