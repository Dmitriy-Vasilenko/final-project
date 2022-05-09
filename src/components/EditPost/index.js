import React, { useState, useEffect,useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import ModalContext from '../../contexts/modalContext';
import PostsContext from '../../contexts/postsContext';
import { Grid, TextField, Typography, FormControl, Button } from '@mui/material';

export const EditPost = () => {
  const navigate = useNavigate();
  const params = useParams();
  const api = useApi();
  const { setPostsTotal } = useContext(PostsContext);
  const { setModalState } = useContext(ModalContext);
  const { readLS } = useLocalStorage();
  const page = readLS('page');
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    api.editPost(params.postId, {
      image: image.trim(),
      title: title.trim(),
      text: text.trim(),
      tags: tags.split(',').map(elem => elem.trim())
    }).then(data => {
      setPostsTotal(prevState => [...prevState])
      navigate(`/?page=${page}`)
    })
    .catch(() => setModalState(() => {
      return { 
        isOpen: true, 
        msg: 'Ошибка редактирования'
      }
    }))
  }

  useEffect(() => {
    api.getPost(params.postId)
    .then(data => {
      setImage(data.image)
      setTitle(data.title)
      setText(data.text)
      setTags(data.tags)
    })}, [])



  return (
    <Grid container maxWidth='75%'>
      <FormControl component='form' fullWidth onSubmit={handleSubmit}>
        <Grid container direction='column' spacing='10'>
          <Grid item>
            <Typography variant='h3'>Редактирование поста</Typography>
          </Grid>
          <Grid item>
            <TextField 
              fullWidth 
              label='URL картинки поста' 
              name='inputUrl' 
              type='url' 
              value={image} 
              onChange={({target}) => setImage(target.value)}
            />
          </Grid>
          <Grid item>
            <TextField 
              fullWidth 
              label='Заголовок поста' 
              name='inputTitle' 
              type='text' 
              value={title} 
              onChange={({target}) => setTitle(target.value)}
            />
          </Grid>
          <Grid item>
            <TextField 
              fullWidth 
              label='Текст поста' 
              name='inputText' 
              multiline 
              rows={4} 
              type='text' 
              value={text}
              onChange={({target}) => setText(target.value)}
            />
          </Grid>
          <Grid item>
            <TextField 
              fullWidth 
              label='Введите теги через запятую' 
              name='inputTags' 
              type='text' 
              value={tags} 
              onChange={({target}) => setTags(target.value)}
            />
          </Grid>
          <Grid item display='flex' gap='10px' justifyContent='flex-end'>
            <Button variant="outlined" onClick={() => navigate(`/?page=${page}`)}>Отмена</Button>
            <Button variant="contained" type='submit'>Сохранить</Button>
          </Grid>
        </Grid>
      </FormControl>
    </Grid>
  )
}
