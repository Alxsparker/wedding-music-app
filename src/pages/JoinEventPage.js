import React, { useState } from 'react';
import { useEvent } from '../context/EventContext'; // Vérifiez cette ligne
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const JoinEventPage = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventPassword, setEventPassword] = useState('');
  const [error, setError] = useState('');
  const { joinEvent } = useEvent();
  const navigate = useNavigate();

  const handleJoinEvent = async () => {
    if (eventName && eventDate && eventPassword) {
      const success = await joinEvent(eventName, eventDate, eventPassword);
      if (success) {
        navigate('/event');
      } else {
        setError('Invalid event code. Please check the event name, date, and password.');
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Join Event
      </Typography>
      <TextField
        label="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Event Date"
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Event Password"
        type="password"
        value={eventPassword}
        onChange={(e) => setEventPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleJoinEvent}>
        Join Event
      </Button>
    </Container>
  );
};

export default JoinEventPage;
