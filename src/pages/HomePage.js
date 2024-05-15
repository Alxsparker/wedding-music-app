import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate('/login');
  };

  const handleJoinEvent = () => {
    navigate('/join-event');
  };

  const handleDjAccess = () => {
    navigate('/dj-access');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Wedding Music App
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCreateEvent}>
        Create Event
      </Button>
      <Button variant="contained" color="primary" onClick={handleJoinEvent}>
        Join Event
      </Button>
      <Button variant="contained" color="primary" onClick={handleDjAccess}>
        DJ Access
      </Button>
    </Container>
  );
};

export default HomePage;
