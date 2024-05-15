import React, { useState } from 'react';
import { useEvent } from '../context/EventContext';
import { TextField, Button, Container, Typography } from '@mui/material';
import QRCodeGenerator from '../components/QRCodeGenerator'; // Importer le composant QRCodeGenerator

const CreateEventPage = () => {
  const { createEvent, event } = useEvent();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent(name, date, password);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Créer un Événement
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom de l'Événement"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date de l'Événement"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Mot de Passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Créer
        </Button>
      </form>
      {event && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Partagez cet événement :</Typography>
          <QRCodeGenerator url={event.url} />
        </div>
      )}
    </Container>
  );
};

export default CreateEventPage;
