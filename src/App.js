import React, {useState, useEffect} from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import UserContext from './contexts/userContext';
import api from './utils/api';
import './index.css';

export const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.getUser()
    .then(user => setUser(user))
    .catch(err => alert(err))
  }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className='app'>
        <Header/>
        <Footer/>
      </div>
    </UserContext.Provider>
  )
}

