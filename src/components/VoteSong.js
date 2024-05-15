import React from 'react';
import { useEvent } from '../context/EventContext';
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const VoteSong = () => {
  const { songs, voteSong } = useEvent();

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Vote for Songs
      </Typography>
      <List>
        {songs.map((song) => (
          <ListItem key={song.id}>
            <ListItemText
              primary={song.title}
              secondary={song.artist}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="upvote" onClick={() => voteSong(song.id, 1)}>
                <ThumbUpIcon />
              </IconButton>
              <IconButton edge="end" aria-label="downvote" onClick={() => voteSong(song.id, -1)}>
                <ThumbDownIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default VoteSong;
