import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useEvent } from '../context/EventContext';
import { auth } from '../firebase';

const DjAccessPage = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { joinEvent, userRole } = useEvent();
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/dj-login'); // Rediriger vers la page de connexion DJ si l'utilisateur n'est pas connecté
    }
  }, [navigate]);

  useEffect(() => {
    if (userRole !== 'dj') {
      setError('Access Denied');
    }
  }, [userRole]);

  const handleAccess = async () => {
    const success = await joinEvent(name, date, password);
    if (success) {
      navigate('/dj-results');
    } else {
      setError('Invalid event code');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        DJ Access
      </Typography>
      <TextField
        label="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Event Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleAccess}>
        Access Results
      </Button>
    </Container>
  );
};

export default DjAccessPage;
