import React from 'react';
import { useEvent } from '../context/EventContext'; // Vérifiez cette ligne
import { Button, Container, Typography } from '@mui/material';

const DjDashboard = () => {
  const { songs, votes } = useEvent();

  const getTopSongs = (limit) => {
    return [...songs].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0)).slice(0, limit);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        DJ Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={() => getTopSongs(10)}>
        Top 10
      </Button>
      <Button variant="contained" color="primary" onClick={() => getTopSongs(50)}>
        Top 50
      </Button>
      <div>
        <h2>Top Songs</h2>
        <ul>
          {getTopSongs(10).map((song) => (
            <li key={song.id}>
              {song.title} by {song.artist} - {votes[song.id] || 0} votes
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default DjDashboard;
