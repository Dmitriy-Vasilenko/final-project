import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useApi } from '../../hooks/useApi';
import FavoriteContext from '../../contexts/favoriteContext';
import UserContext from '../../contexts/userContext';
import PostsContext from '../../contexts/postsContext';
import ModalContext from '../../contexts/modalContext';
import { Button, Grid, Paper, Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, Typography, Box, IconButton, Badge, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

export const PostCard = () => {
  const api = useApi();
  const params = useParams();
  const navigate = useNavigate();
  const { writeLS, removeLS } = useLocalStorage();
  const { favorite, setFavorite } = useContext(FavoriteContext);
  const { postsTotal, setPostsTotal } = useContext(PostsContext);
  const { setModalState } = useContext(ModalContext);
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState(null);
  const [post, setPost] = useState(null);  
  const [showComments, setShowComments] = useState('none');
  const [badgeContent, setBadgeContent] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
      api.getPost(params.postId)
      .then(data => { 
        setPost(data)
        setComments(data.comments)
        setBadgeContent(data.likes.length)
      })
  }, [])

  const addFavorite = () => { 
    writeLS('favorite', post._id);
    setFavorite(prevState => [...prevState, post._id]);

    api.addLike(post._id)
    .then(addedLike => {
      setBadgeContent(addedLike.likes.length)
      setModalState(() => {
          return {
            isOpen: true, 
            msg: 'Вы поставили лайк'
          }
      })
    })
    .catch(() => setModalState(() => {
      return {
        isOpen: true,
        msg:'Не удалось поставить лайк'
      }
    }))
  }

  const removeFavorite = () => {
    removeLS('favorite', post._id);
    setFavorite(prevState => prevState.filter(id => post._id !== id));

    api.deleteLike(post._id)
    .then(deletedLike => {
      setBadgeContent(deletedLike.likes.length)
      setModalState(() => {
        return {
          isOpen: true, 
          msg: 'Вы убрали лайк'
        }
      })
    })
    .catch(() => setModalState(() => {
      return {
        isOpen: true, 
        msg: 'Не удалось снять лайк'
      }
    }))
  }

  const deleteMyPost = () => {
    api.deletePost(post._id)
    setPostsTotal(postsTotal - 1)
    setModalState(() => {
      return {
        isOpen: true, 
        msg: 'Ваш пост удален'
      }
    })
    navigate('/')
  }

  const getPostComments = () => {
    if (comments.length !== 0) {
      api.getComments(params.postId)
      .then(data => {
      setComments(data)
      setShowComments('block')
    })
    .catch(error => console.log(error))
    }     
  }

  const handleCloseComments = () => {
    setShowComments('none')
  }

  const handleChangeInputValue = (event) => {
    setInputValue(event.target.value)
  }

  const sendComment = () => {
    console.log(params.postId)
    api.addComments(inputValue, params.postId)
    .then(data => console.log(data))
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: 'fit-content', 
      overflowY: 'auto',
      width: '100%',
      mb: 4
    }}>
    {post && (
      <Paper elevation={2} sx={{width: '90%', mb: 5, mt: 2}}>
        <Card sx={{width: '100%', pr: 3}}>
          <Grid container spacing={4} sx={{mb: 5}}>
            <Grid container item xs={6} direction='column'>
              
              <Grid item>
                <CardHeader 
                  avatar={
                    <Avatar src={post.author.avatar} sx={{width:'70px', height: '70px'}}/>
                  }
                  title={post.author.name}
                />
              </Grid>

              <Grid item>
                <CardMedia
                  component='img'
                  image={post.image}
                  height='400'
                  alt='Упс! Картинка не загрузилась'
                  sx={{mb: 3}}
                />
              </Grid>

              <Grid item>
                <CardActions>
                  <Grid container item xs={6} spacing={8}>
                    <Grid item xs={2}>
                    {
                      favorite.includes(post._id) ? 
                        <IconButton onClick={removeFavorite} aria-label='add to favorites'>
                          <Badge  badgeContent={badgeContent} color='primary' showZero>
                            <FavoriteIcon color='secondary' />
                          </Badge>
                        </IconButton> :
                        <IconButton onClick={addFavorite} aria-label='remove to favorites'>
                          <Badge  badgeContent={badgeContent} color='primary' showZero>
                            <FavoriteBorderIcon color='secondary' />
                          </Badge>
                        </IconButton>
                    }
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={getPostComments} title='Показать комментарии'>
                        <Badge badgeContent={comments?.length} color='primary' showZero>
                          <ChatOutlinedIcon color='secondary'  />
                        </Badge>
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardActions>

                <CardContent sx={{display: `${showComments}`}}>
                  <Grid container >
                  <Grid container item sx={{mb: 2}} alignItems='center'>
                    <Grid item xs={6} sx={{mr: 2}}>
                      <TextField label="Оставьте комментарий" variant="outlined" value={inputValue} onChange={handleChangeInputValue} />
                    </Grid>
                    <Grid item xs={4}>
                      <Button variant='outlined' size='small' onClick={sendComment}>Отправить</Button>
                    </Grid>
                  </Grid>
                  { comments && comments.map(
                    (comment) => 
                    (<Grid 
                        container item
                        spacing={2} 
                        sx={{marginBottom: 2}} 
                        direction='row' 
                        justifyContent='flex-start' 
                        key={comment._id}>
                      
                      <Grid item>
                        <Avatar src={comment.author.avatar} />
                      </Grid>
                      <Grid item>
                        <Typography variant='subtitle2' component='h6'>{comment.author.name}</Typography>
                      <Typography variant='body2' paragraph>{comment.text}</Typography> 
                      </Grid> 
                    </Grid>)
                  )}
                  {
                    comments && 
                    <Button 
                      sx={{fontSize: '14px'}} 
                      onClick={handleCloseComments}
                    >
                      Скрыть комментарии
                    </Button>
                  }
                </Grid> 
              </CardContent>
            </Grid>



            </Grid>      

            <Grid container item xs={6} sx={{mt: 4}} direction='column' justifyContent='space-between'>
                  <Grid item>
                    <CardContent>
                      <Typography component='h2' variant='h6' gutterBottom color='primary.dark'>
                        {post.title}
                      </Typography>
                      <Typography variant='body2' align='justify' paragraph>
                        {post.text}
                      </Typography>
                    </CardContent>
                  </Grid>
              
                  {
                  user?._id === post.author._id ?
                  (
                    <Grid container item spacing={8} justifyContent='flex-end'>

                      <Grid item xs={4}>
                        <Button variant='outlined' onClick={() => console.log('Редактировать')}>Редактировать</Button>
                      </Grid>

                      <Grid item xs={4} sx={{mb: 3}}>
                        <Button variant='outlined' onClick={deleteMyPost}>Удалить</Button>
                      </Grid>

                    </Grid>
                  ) : (
                    <span />
                  )
                }

            </Grid>
            
          </Grid>          
        </Card>
      </Paper>
    )}

      <Button variant='outlined' onClick={() => navigate('/')}>Назад</Button>

    </Box>
    

      

  )
}
