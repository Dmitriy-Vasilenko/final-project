import React from 'react';

import { Link } from 'react-router-dom';

import logo from '../../../public/assets/svg/logo.svg';

export const Logo = ({page}) => {
  return (
    <Link to={`/?page=${page}`}>
      <img src={logo} height='45px' alt='logo'/>
    </Link>
  )
}
