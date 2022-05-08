import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useApi } from '../../hooks/useApi';
import FavoriteContext from '../../contexts/favoriteContext';
import UserContext from '../../contexts/userContext';
import { Button, Grid, Paper, Card, CardHeader, CardContent, CardMedia, CardActions } from '@mui/material';

export const PostCard = () => {
  const api = useApi();
  const params = useParams();
  const navigate = useNavigate();
  const { writeLS, removeLS } = useLocalStorage();
  const [post, setPost] = useState(null);
  const { favorite, setFavorite } = useContext(FavoriteContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
      api.getPost(params.postId)
      .then(data => setPost(data))
  }, [])

  // Временное решение для получения id user

  useEffect(() => {
    api.getUser().then(user => console.log(user))
  }, [])

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center' >
      <Grid item sx={12}>
        <Paper elevation={3}>
      <Card>
      <Grid container spacing={5}>
      <Grid item sx={6}>
        <Button onClick={() => console.log('Редактировать')}>Редактировать</Button>
      </Grid>
      <Grid item sx={6}>
        <Button onClick={() => console.log('Удалить')}>Удалить</Button>
      </Grid>
      </Grid>
      </Card>
    </Paper>
      <Grid item sx={12}>
        <Button onClick={() => navigate('/')}>Назад</Button>
      </Grid>
      </Grid>
    </Grid>
    

      

  )
}
