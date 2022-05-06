import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PostsContext from '../../contexts/postsContext';
import FavoriteContext from '../../contexts/favoriteContext';
import { Post } from '../Post';
import { Pagination, PaginationItem, Grid, Stack, Container, Box } from '@mui/material';

export const PostList = ({page, setPage, quantityPages}) => {
  const { favorite } = useContext(FavoriteContext);
  const { posts } = useContext(PostsContext);

  const handleChangePage = (event, pageNumber) => {
    setPage(pageNumber)
    localStorage.setItem('page', pageNumber)
  }
  
  return (
    <Container component='main' maxWidth='lg' sx={{mt: 10}}>
    <Grid 
      container 
      direction='column' 
      justifyContent='center'
      alignItems='center'
    >
      {
        posts && <Grid container spacing={3} sx={{mb: 4}}> 
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={post._id}> 
            <Post 
              post={post} 
              isItFavorite={favorite.includes(post._id)}
            />
          </Grid>  
        ))} 
        </Grid>
      } 

      <Grid item xs={12} alignItems='center' marginBottom={4}>
        <Stack spacing={2} >
          <Pagination 
            count={quantityPages} 
            color='primary' 
            page={page} 
            onChange={handleChangePage}
            renderItem={(item) => (
              <PaginationItem 
                component={Link} 
                to={`/?page=${item.page}`}
                {...item} 
              />
            )}
          />
        </Stack>
      </Grid>
    </Grid>  
    </Container>
  )
}
