import React from 'react';

import { Link } from 'react-router-dom';

import logo from '../../../public/assets/svg/logo.svg';

export const Logo = () => {
  return (
    <Link to='/'>
      <img src={logo} height='45px' alt='logo'/>
    </Link>
  )
}
