import React from 'react';
import Results from '../components/Results';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1>Admin/DJ Page</h1>
      <Results />
      <div className="controls">
        <button>Start Playlist</button>
        <button>Pause Playlist</button>
        <button>Next Song</button>
      </div>
    </div>
  );
};

export default AdminPage;
