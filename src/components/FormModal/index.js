import React, { useContext, useState } from 'react';

import FormModalContext from '../../contexts/formModalContext';
import UserContext from '../../contexts/userContext';
import ModalContext from '../../contexts/modalContext';

import { useApi } from '../../hooks/useApi';

import { TextField, Modal, Typography, Button, Box, Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const FormModal = () => {
    const { modalFormState, setModalFormState } = useContext(FormModalContext);
    const { setUser } = useContext(UserContext);
    const { setModalState } = useContext(ModalContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const api = useApi();


    const handleEmailChange = ({ target }) => {
        setEmail(target.value);
    };

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value);
    };

    const signUp = () => {
        api.signUp({ email, password })
            .then((createdUser) => {
                console.log({ createdUser });
                return api.signIn({ email, password });
            })
            .then((signedInUser) => {
                const { token, data } = signedInUser;
                localStorage.setItem('token', JSON.stringify(token));
                setUser(data);
                setModalFormState(() => {
                    return {
                        isOpen: false,
                        msg: null,
                    };
                });
                setEmail('');
                setPassword('');
            })
            .catch((err) => {
              if(err.includes('409')) {
                setModalState(() => {
                  return {
                    isOpen: true,
                    msg: 'Пользователь уже существует.',
                  };
                });
              }else{
                setModalState(() => {
                  return {
                    isOpen: true,
                    msg: 'Поля заполнены неверно.',
                  };
                });
              }
            });
    };

    const signIn = () => {
      api.signIn({ email, password })
          .then((signedUser) => {
              const { token, data } = signedUser;
              localStorage.setItem('token', JSON.stringify(token));
              setUser(data);
              setModalFormState(() => {
                  return {
                      isOpen: false,
                      msg: null,
                  };
              });
              setEmail('');
              setPassword('');
          })
          .catch((err) => {
            if(err.includes('401')) {
              setModalState(() => {
                return {
                  isOpen: true,
                  msg: 'Неверный логин или пароль.',
                };
              });
            }else{
              setModalState(() => {
                return {
                  isOpen: true,
                  msg: 'Поля заполнены неверно.',
                };
              });
            }
          });
  }

    return (
        <Modal open={modalFormState.isOpen} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
            <Box sx={style}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography id='modal-modal-title' variant='h6' component='h2'>
                            Введите ваши данные
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label='Email' variant='outlined' required value={email} onChange={handleEmailChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label='Password'
                            type='password'
                            variant='outlined'
                            required
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant='contained' size='small' onClick={signUp}>
                            Регистрация
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant='contained' size='small'onClick={signIn}>
                            Логин
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};
