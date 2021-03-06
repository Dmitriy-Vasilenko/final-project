import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, Box, Avatar, Chip, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import UserContext from '../../contexts/userContext';
import FormModalContext from '../../contexts/formModalContext';
import PostsContext from '../../contexts/postsContext';
import { Logo } from '../Logo';

export const Header = ({ setPage }) => {
  const navigate = useNavigate();
  const navigateToEditPage = () => {
    navigate('user/edit');
  }
  const { user, setUser } = useContext(UserContext);
  const { setModalFormState } = useContext(FormModalContext);
  const { setPosts } = useContext(PostsContext);

  const deleteUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('page');
    setPage(1);
    navigate(`/?page=1`)
    setUser(null);
    setPosts(null);
    setModalFormState(() => {
      return {
        isOpen: true,
        msg: '',
      };
  });
  };

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
            <Logo setPage={setPage} />
            <Typography>ADM Posts</Typography>
          </Box>
          <Box component='div' sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexGrow: 1
          }}>
          </Box>
          <Stack direction="row" spacing={2}> 
            <Chip avatar={<Avatar alt="Natacha" src = {user?.avatar} />}  label={user?.name} onClick ={navigateToEditPage}  variant="outlined" />
            <Chip icon={<LogoutIcon />}  label='Выход' onClick={deleteUser}   variant="outlined" />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

