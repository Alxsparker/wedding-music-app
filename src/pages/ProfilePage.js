import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { TextField, Button, Container, Typography } from '@mui/material';

const ProfilePage = () => {
  const [userData, setUserData] = useState({ email: '', role: '' });
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordChange = async () => {
    try {
      const user = auth.currentUser;
      await user.updatePassword(newPassword);
      setSuccess('Password updated successfully');
    } catch (error) {
      setError('Error updating password');
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), userData);
        setSuccess('Profile updated successfully');
      }
    } catch (error) {
      setError('Error updating profile');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <TextField
        label="Email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Role"
        value={userData.role}
        onChange={(e) => setUserData({ ...userData, role: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}
      <Button variant="contained" color="primary" onClick={handlePasswordChange}>
        Change Password
      </Button>
      <Button variant="contained" color="primary" onClick={handleProfileUpdate}>
        Update Profile
      </Button>
    </Container>
  );
};

export default ProfilePage;
