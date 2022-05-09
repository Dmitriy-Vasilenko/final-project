import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/userContext';
import { AppBar, Container, Toolbar, Typography, Box, Avatar, Chip, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import FormModalContext from '../../contexts/formModalContext';
import { Logo } from '../Logo';

export const Header = ({page}) => {
  const navigate = useNavigate();
  const navigateToEditPage = () => {
    navigate('user/edit');
  }
  const {user} = useContext(UserContext);
  const { setModalFormState } = useContext(FormModalContext);

  const deleteUser = () => {
    localStorage.removeItem('token');
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
            <Logo page={page}/>
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

