import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useApi } from './hooks/useApi';
import { useLocalStorage } from './hooks/useLocalStorage';

import { Header } from './components/Header';
import { PostList } from './components/PostList';
import { PostCard } from './components/PostCard';
import { Footer } from './components/Footer';
import { EditUser } from './components/EditUser';
import { FormModal } from './components/FormModal';
import { CreatePost } from './components/CreatePost';
import Modal from './components/Modal';

import UserContext from './contexts/userContext';
import PostsContext from './contexts/postsContext';
import FavoriteContext from './contexts/favoriteContext';
import ModalContext from './contexts/modalContext';
import FormModalContext from './contexts/formModalContext';

import './index.css';

export const App = () => {
  const { readLS } = useLocalStorage();
  const api = useApi();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [favorite, setFavorite] = useState(JSON.parse(localStorage.getItem('favorite')) || [])
  const [page, setPage] = useState(JSON.parse(localStorage.getItem('page')) || 1)
  const [quantityPages, setQuantityPages] = useState(0);
  const [modalState, setModalState] = useState({
    isOpen: false,
    msg: null,
});
  const [modalFormState, setModalFormState] = useState({
    isOpen: false,
    msg: null,
});

  useEffect(() => {
    api.getUser().then((user) => setUser(user));
  }, []);

  useEffect(() => {
    const token = readLS('token');
    if (!token) {
        setModalFormState(() => {
            return {
                isOpen: true,
                msg: '',
            };
        });
    }
  }, []);

    useEffect(() => {
      if(user){
        api.getPosts(page)
        .then(post => {
          setPosts(post.posts)
          setQuantityPages(Math.ceil(post.total/12))
        })
        .catch(err => alert(err))
      }
    }, [page, quantityPages, favorite, user, posts]); 
  


  return (
      <UserContext.Provider value={{user, setUser}}>
        <ModalContext.Provider value={{ modalState, setModalState }}>
          <FormModalContext.Provider value={{ modalFormState, setModalFormState }}>
            <PostsContext.Provider value={{posts, setPosts}}>
              <FavoriteContext.Provider value={{favorite, setFavorite}}>
                <div className='app'>
                  <Modal />
                  <FormModal />
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
                  <Route path='user/edit' element={<EditUser />} />
                  <Route path='post/create' element={<CreatePost quantityPages={quantityPages}/>} />
                </Routes>
                <Footer/>
              </div>
              </FavoriteContext.Provider>
            </PostsContext.Provider>
          </FormModalContext.Provider>
        </ModalContext.Provider>
      </UserContext.Provider>
  )
}

