import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import UserContext from '../../contexts/userContext';

import { useApi } from '../../hooks/useApi';

import { useLocalStorage } from '../../hooks/useLocalStorage';

import{Grid, Typography, TextField, Button} from '@mui/material';


export const EditUser = () => {
    const navigate = useNavigate();
    const {readLS} = useLocalStorage();
    const page = readLS('page')
    const api = useApi();

    const{user, setUser} = useContext(UserContext);
    const[userName, setUserName] = useState('');
    const[userAbout, setUserAbout] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    const handleClick = () => {
        api.editCurrentUser ({ name: userName, about: userAbout })
        .then((data) => {
          setUser(data);
        })
        .catch((err)=> alert(err));

        api.editAvatarUser ({ avatar: userAvatar})
        .then((data) => {
          setUser(data);
          navigate(`/?page=${page}`);
        })
        .catch((err)=> alert(err));
    }

    const handleOut = () =>{
        navigate(`/?page=${page}`);
    }
    useEffect(() => {
        if(user) {
            setUserName(user.name);
            setUserAbout(user.about);
            setUserAvatar(user.avatar);
        }
    },[user])
  return (
    <div>
      <Grid container flexDirection='column' spacing='10'>
              <Grid item>
                  <Typography variant='h3'>Редактировать юзера </Typography>
              </Grid>
              <Grid item>
                  <TextField
                      fullWidth
                      label='имя'
                      variant='outlined'
                      value={userName}
                      onChange={({ target }) => {
                          setUserName(target.value);
                      }}
                  />
              </Grid>
              <Grid item>
                  <TextField
                      fullWidth
                      label='доп инфо'
                      variant='outlined'
                      value={userAbout}
                      onChange={({ target }) => {
                          setUserAbout(target.value);
                      }}
                  />
              
              </Grid>
              <Grid item>
                  <TextField
                      fullWidth
                      label='Ссылка на аватар'
                      variant='outlined'
                      value={userAvatar}
                      onChange={({ target }) => {
                          setUserAvatar(target.value);
                      }}
                  />
              
              </Grid >
              <Grid item>
                  <Button onClick ={handleClick}  variant='contained' sx={{marginRight: 2}}  size='small'>
                      Сохранить
                  </Button>
                  <Button onClick ={handleOut}  variant='contained'  size='small'>
                      Отмена
                  </Button>
              </Grid>
          </Grid>
    </div>
  )
}
