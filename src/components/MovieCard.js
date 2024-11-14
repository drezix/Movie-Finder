import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MovieCard = ({ movie }) => (
  <Card style={{ marginBottom: '10px' }}>
    <CardContent>
      <Typography variant="h6">{movie.title}</Typography>
      <Typography color="textSecondary">{movie.release_date}</Typography>
      <Typography variant="body2">{movie.overview}</Typography>
    </CardContent>
  </Card>
);

export default MovieCard;
