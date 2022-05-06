import React, {useContext} from 'react';
import UserContext from '../../contexts/userContext';
import { AppBar, Container, Toolbar, Typography, Box, Avatar, Chip } from '@mui/material';
import { Logo } from '../Logo';

export const Header = () => {
  const {user} = useContext(UserContext);

  return (
    <AppBar position='sticky'>
      <Container fixed>
        <Toolbar>
          <Box component='div' sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Logo/>
            <Typography>ADM Posts</Typography>
          </Box>
          <Box component='div' sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexGrow: 1
          }}>
          <Chip 
              avatar={<Avatar alt='avatar' src=''/>}
              label='user'
              clickable={true}
              sx={{marginRight: 4}}
          />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
