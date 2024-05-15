import React from 'react';
import { useEvent } from '../context/EventContext';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Results = () => {
  const { songs, votes } = useEvent();

  const sortedSongs = songs.sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Results
      </Typography>
      <List>
        {sortedSongs.map((song) => (
          <ListItem key={song.id}>
            <ListItemText
              primary={`${song.title} - ${song.artist}`}
              secondary={`Votes: ${votes[song.id] || 0}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Results;
