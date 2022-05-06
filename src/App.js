import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import UserContext from './contexts/userContext';

import './index.css';

export const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className='app'>
        <Header/>
        <Footer/>
      </div>
    </UserContext.Provider>
  )
}

