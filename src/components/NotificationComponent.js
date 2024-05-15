import React, { useEffect } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseApp } from '../firebase'; // Importez votre configuration Firebase

const NotificationComponent = () => {
  useEffect(() => {
    const messaging = getMessaging(firebaseApp);

    // Demande de permission pour les notifications
    getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' }).then((currentToken) => {
      if (currentToken) {
        console.log('Token received:', currentToken);
        // Envoyer ce token au backend pour gérer les notifications
      } else {
        console.error('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.error('An error occurred while retrieving token. ', err);
    });

    // Gérer les messages reçus pendant que l'application est en premier plan
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // Customiser la notification ici
    });
  }, []);

  return <div>Notification Component</div>;
};

export default NotificationComponent;
