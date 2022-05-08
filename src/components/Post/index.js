import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import FavoriteContext from '../../contexts/favoriteContext';
import ModalContext from '../../contexts/modalContext';
import { Paper, Card, CardHeader, CardContent, CardMedia, CardActions, Typography, Avatar, IconButton, Badge, Button, Grid, Chip, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import dayjs from 'dayjs';

export const Post = ({ post, isItFavorite }) => {
  const api = useApi();
  const navigate = useNavigate();
  const { writeLS, removeLS } = useLocalStorage();
  const { setFavorite } = useContext(FavoriteContext);
  const { setModalState } = useContext(ModalContext);
  const [badgeContent, setBadgeContent] = useState(post.likes.length);
  const createdDate = dayjs(post.created_at).format('D MMMM YYYY');

  const arrayTags = post.tags.filter(tag => {
    return (tag !== '' && tag != 'undefined' && tag !== ' ') 
  }); 
  
  const addFavorite = () => { 
    writeLS('favorite', post._id);
    setFavorite(prevState => [...prevState, post._id]);

    api.addLike(post._id)
    .then(addedLike => {
      setBadgeContent(addedLike.likes.length)
    })
    .catch(() => setModalState(() => {
      return {
        isOpen: true,
        msg: 'Не удалось поставить лайк'
      }
    }))
  }

  const removeFavorite = () => {
    removeLS('favorite', post._id);
    setFavorite(prevState => prevState.filter(id => post._id !== id));

    api.deleteLike(post._id)
    .then(deletedLike => {
      setBadgeContent(deletedLike.likes.length)
    })
    .catch(() => setModalState(() => {
      return {
        isOpen: true,
        msg: 'Не удалось убрать лайк'
      }
    }))
  }

  return (
    <Paper elevation={4} sx={{maxWidth: 400, height: 500}}>
      <Card sx={{ maxWidth: 400, height: '100%'}}>
        <CardHeader 
          sx={{display: 'flex', alignItems: 'flex-start'}}
          avatar={
            <Avatar aria-label="avatar" src={post.author.avatar} sx={{width: 50, height: 50}}/>
          }
          title={
            <Typography color='primary.dark' variant='h6' component='h3' noWrap={true} sx={{fontSize: '18px', maxWidth: '220px'}}>
              {post.title}
            </Typography>
          }
          subheader={
            <Typography color='primary.light' variant='subtitle2' paragraph sx={{fontSize:'13px'}}>
              {createdDate}
            </Typography>
          }
        /> 

        <CardMedia
          component='img'
          height='200'
          width='400'
          image={post.image}
          alt='Упс! Картинка не загрузилась'
        />

        <CardContent>
          <Typography variant='body2' color='text.secondary' sx={{mb: 4, height: '50px', overflow: 'hidden', overflowWrap: 'break-word', textOverflow: 'ellipsis'}} align='justify'>
            {post.text}
          </Typography>
          <Stack direction='row' spacing={1}>
          {
          arrayTags.map((tag, i) => {
              return <Chip 
                  key={i} 
                  label={tag} 
                  variant='outlined' 
                  size='small' 
                  color='primary'
                  sx={{
                  fontSize:'12px',
                  borderRadius: '3px',
                  }} 
              />
          })
          }
          </Stack>
        </CardContent>

        <CardActions>
          <Grid container direction='row' justifyContent='space-between'>
            <Grid item>
            {
              isItFavorite ? 
                <IconButton aria-label="add to favorites" onClick={removeFavorite}>
                  <Badge badgeContent={badgeContent} color='primary' showZero>
                    <FavoriteIcon color='secondary' />
                  </Badge>
                </IconButton> :
                <IconButton aria-label="add to favorites" onClick={addFavorite}>
                  <Badge badgeContent={badgeContent} color='primary' showZero>
                    <FavoriteBorderIcon color='secondary' />
                  </Badge>
                </IconButton>
            }
            
            <IconButton aria-label='comments'>
              <Badge badgeContent={post.comments.length} color='primary' showZero sx={{ml: 2}}>
                <ChatOutlinedIcon color='secondary' />
              </Badge>
            </IconButton>
            </Grid>
            <Grid item>
              <Button onClick={() => navigate(`post/${post._id}`)}>Читать</Button>
            </Grid>
          </Grid>
        </CardActions>          
      </Card>
    </Paper> 
  )
}