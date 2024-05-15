import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginSignUpPage from './pages/LoginSignUpPage';
import CreateEventPage from './pages/CreateEventPage';
import JoinEventPage from './pages/JoinEventPage';
import DjLoginPage from './pages/DjLoginPage';
import DjAccessPage from './pages/DjAccessPage';
import DjResults from './pages/DjResults';
import EventPage from './pages/EventPage';
import UserEventsPage from './pages/UserEventsPage';
import ProfilePage from './pages/ProfilePage';
import { EventProvider } from './context/EventContext';
import './App.css';

const App = () => {
  return (
    <EventProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginSignUpPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/join-event" element={<JoinEventPage />} />
            <Route path="/dj-login" element={<DjLoginPage />} />
            <Route path="/dj-access" element={<DjAccessPage />} />
            <Route path="/dj-results" element={<DjResults />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/user-events" element={<UserEventsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </EventProvider>
  );
};

export default App;
