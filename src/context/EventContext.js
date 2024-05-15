import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, onSnapshot, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const EventContext = createContext();

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [event, setEvent] = useState(null);
  const [songs, setSongs] = useState([]);
  const [votes, setVotes] = useState({});
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (event) {
      fetchSongs(event.id);
    }
  }, [event]);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      }
    };

    fetchUserRole();
  }, []);

  const fetchSongs = (eventId) => {
    const q = query(collection(db, "songs"), where("eventId", "==", eventId));
    return onSnapshot(q, (querySnapshot) => {
      const songsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setSongs(songsData);

      const votesData = {};
      songsData.forEach(song => {
        votesData[song.id] = song.votes || 0;
      });
      setVotes(votesData);
    });
  };

  const generateEventUrl = (eventId) => {
    const url = `${window.location.origin}/event/${eventId}`;
    console.log(`Generated event URL: ${url}`);
    return url;
  };

  const createEvent = async (name, date, password) => {
    const user = auth.currentUser;
    if (user) {
      const eventDocRef = await addDoc(collection(db, "events"), { name, date, password, userId: user.uid });
      const eventId = eventDocRef.id;
      const eventUrl = generateEventUrl(eventId);

      setEvent({ id: eventId, name, date, password, userId: user.uid, url: eventUrl });

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { role: 'dj' }, { merge: true });
      setUserRole('dj');
    } else {
      console.error("User not authenticated");
    }
  };

  const joinEvent = async (name, date, password) => {
    const q = query(collection(db, "events"), where("name", "==", name), where("date", "==", date), where("password", "==", password));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const eventData = querySnapshot.docs[0].data();
      setEvent({ id: querySnapshot.docs[0].id, ...eventData });

      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } else {
        console.error("User not authenticated");
      }

      return true;
    } else {
      return false;
    }
  };

  const getUserEvents = async (userId) => {
    const q = query(collection(db, "events"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  const proposeSong = async (song, artist) => {
    if (event) {
      const docRef = await addDoc(collection(db, "songs"), { title: song, artist, eventId: event.id, votes: 0 });
      setSongs([...songs, { id: docRef.id, title: song, artist, eventId: event.id, votes: 0 }]);
    }
  };

  const voteSong = async (songId, delta) => {
    const songRef = doc(db, "songs", songId);
    const songDoc = await getDoc(songRef);
    const currentVotes = songDoc.data().votes || 0;
    await updateDoc(songRef, { votes: currentVotes + delta });
    setVotes({ ...votes, [songId]: currentVotes + delta });
  };

  return (
    <EventContext.Provider value={{ event, createEvent, joinEvent, getUserEvents, proposeSong, voteSong, songs, votes, setEvent, fetchSongs, userRole }}>
      {children}
    </EventContext.Provider>
  );
};
