import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';

const LoginSignUpPage = () => {
  const [isNewAccount, setIsNewAccount] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDj, setIsDj] = useState(false); // Ajout d'un état pour la case à cocher
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNewAccount = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Assigner le rôle de DJ ou de guest lors de la création du compte
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { role: isDj ? 'dj' : 'guest' }, { merge: true });

      navigate('/user-events');
    } catch (error) {
      console.error('Error creating new account:', error);
      setError(error.message);
    }
  };

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/user-events');
    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.message);
    }
  };

  const toggleLogInNewAccount = () => {
    setIsNewAccount(!isNewAccount);
    setError('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        {isNewAccount ? 'Create New Account' : 'Log In'}
      </Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      {isNewAccount && (
        <FormControlLabel
          control={
            <Checkbox
              checked={isDj}
              onChange={(e) => setIsDj(e.target.checked)}
              color="primary"
            />
          }
          label="Sign up as DJ"
        />
      )}
      {error && <Typography color="error">{error}</Typography>}
      {isNewAccount ? (
        <Button variant="contained" color="primary" onClick={handleNewAccount}>
          New Account
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleLogIn}>
          Log In
        </Button>
      )}
      <Button onClick={toggleLogInNewAccount}>
        {isNewAccount ? 'Already have an account? Log In' : "Don't have an account? Create New Account"}
      </Button>
    </Container>
  );
};

export default LoginSignUpPage;
