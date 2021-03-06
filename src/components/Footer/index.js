import React from 'react';
import { AppBar, Container, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <AppBar 
      component='footer'
      position='static'
      sx={{
        height: '45px',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Container fixed>
        <Typography align='center'>©️ ADM Team</Typography>
      </Container>
    </AppBar>
  )
}
