import React, { useEffect, useState } from 'react';
import { useEvent } from '../context/EventContext';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { auth } from '../firebase';

const UserEventsPage = () => {
  const { getUserEvents, setEvent } = useEvent();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const user = auth.currentUser;
      if (user) {
        console.log('Fetching events for user:', user.uid);
        const userEvents = await getUserEvents(user.uid);
        console.log('User events:', userEvents);
        setEvents(userEvents);
      }
    };

    fetchEvents();
  }, [getUserEvents]);

  const handleEventClick = (event) => {
    console.log('Event clicked:', event);
    setEvent(event);
    navigate('/event');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Your Events
      </Typography>
      <List>
        {events.map(event => (
          <ListItem button key={event.id} onClick={() => handleEventClick(event)}>
            <ListItemText primary={event.name} secondary={event.date} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={() => navigate('/create-event')}>
        Create New Event
      </Button>
    </Container>
  );
};

export default UserEventsPage;
