import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Typography, Container } from '@mui/material';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, 'events', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEvent(docSnap.data());
      } else {
        console.error('No such document!');
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {event.name}
      </Typography>
      <Typography variant="h6" component="h2">
        Date: {event.date}
      </Typography>
      <Typography variant="h6" component="h2">
        Created by: {event.userId}
      </Typography>
    </Container>
  );
};

export default EventPage;
