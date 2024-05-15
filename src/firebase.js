import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDYQkaYmHfy4Nup09NyyutmcugH7KS8O7A",
  authDomain: "wedding-music-app.firebaseapp.com",
  projectId: "wedding-music-app",
  storageBucket: "wedding-music-app.appspot.com",
  messagingSenderId: "864567175213",
  appId: "1:864567175213:web:70e9b67ec9ea554cf0f0a4",
  measurementId: "G-NJKTQ4PDYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
