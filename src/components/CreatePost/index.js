import React, { useContext } from 'react';
import { useNavigate } from 'react-router';

import { Button, FormControl, Grid, TextField, Typography } from '@mui/material';

import PostsContext from '../../contexts/postsContext';

import { useApi } from '../../hooks/useApi';
import { SecurityUpdateGood } from '@mui/icons-material';




export const CreatePost = ({ page }) => {
  const navigate = useNavigate();
  const { setPostsTotal } = useContext(PostsContext);
  const api = useApi();
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const {target: {inputUrl, inputTitle, inputText, inputTags}} = event;
    api.addPost({
        image: inputUrl.value.trim(),
        title: inputTitle.value.trim(),
        text: inputText.value.trim(),
        tags: inputTags.value.trim().split(', ' && ',')
    })
    .then((data) => {
        setPostsTotal((prevState) => [...prevState, data]); 
        navigate(`/?page=${page}`);
    })
    .catch((err) => console.log(err));

};

  return (
    <Grid container maxWidth='75%'>
      <FormControl component='form' fullWidth onSubmit={handleSubmit}>
        <Grid container direction='column' spacing='10'>
          <Grid item>
            <Typography variant='h3'>Создание поста</Typography>
          </Grid>
          <Grid item>
            <TextField fullWidth label='URL картинки поста' name='inputUrl' type='url'/>
          </Grid>
          <Grid item>
            <TextField fullWidth label='Заголовок поста' name='inputTitle' type='text'/>
          </Grid>
          <Grid item>
            <TextField fullWidth label='Текст поста' name='inputText' multiline rows={4} type='text'/>
          </Grid>
          <Grid item>
            <TextField fullWidth label='Введите теги через запятую' name='inputTags' type='text'/>
          </Grid>
          <Grid item display='flex' gap='10px' justifyContent='flex-end'>
            <Button variant="outlined" onClick={() => navigate(`/?page=${page}`)}>Отмена</Button>
            <Button variant="contained" type='submit'>Создать</Button>
          </Grid>
        </Grid>
      </FormControl>
    </Grid>
  )
}

