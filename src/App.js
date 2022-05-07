import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useApi } from './hooks/useApi';
import { Header } from './components/Header';
import { PostList } from './components/PostList';
import { PostCard } from './components/PostCard';
import { Footer } from './components/Footer';
import UserContext from './contexts/userContext';
import PostsContext from './contexts/postsContext';
import FavoriteContext from './contexts/favoriteContext';
import './index.css';

export const App = () => {
  const api = useApi();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [postsTotal, setPostsTotal] = useState(null);
  const [favorite, setFavorite] = useState(JSON.parse(localStorage.getItem('favorite')) || []);
  const [page, setPage] = useState(JSON.parse(localStorage.getItem('page')) || 1);
  const [quantityPages, setQuantityPages] = useState(0);

  useEffect(() => {
    api.getPostsTotal()
    .then(data => setPostsTotal(data.length))
  }, [])

  useEffect(() => {
    api.getPosts(page)
    .then(post => {
      setPosts(post.posts)
      setQuantityPages(Math.ceil(post.total/12))
    })
    .catch(err => alert(err))
    }, [page, quantityPages, favorite, postsTotal]) 

  return (
    <UserContext.Provider value={{user, setUser}}>
      <PostsContext.Provider value={{posts, setPosts, postsTotal, setPostsTotal}}>
        <FavoriteContext.Provider value={{favorite, setFavorite}}>
          <div className='app'>
          <Header/>
          <Routes>
            <Route path='/' element={
              <PostList 
                page={page}
                setPage={setPage} 
                quantityPages={quantityPages}
              />
            }>
            </Route>
            <Route path='post/:postId' element={<PostCard />} />
          </Routes>
          <Footer/>
        </div>
        </FavoriteContext.Provider>
      </PostsContext.Provider>
    </UserContext.Provider>
  )
}

