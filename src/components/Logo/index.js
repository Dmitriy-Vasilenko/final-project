import React from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../../public/assets/svg/logo.svg';

import { Button } from '@mui/material';


export const Logo = ({ setPage }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem('page', 1);
    setPage(1)
    navigate(`/?page=1`)
  }

  return (
    <Button onClick={handleClick}>
      <img src={logo} height='45px' alt='logo'/>
    </Button>
  )
}
