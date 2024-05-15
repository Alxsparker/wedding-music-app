import React, { useState } from 'react';
import { useEvent } from '../context/EventContext';

const ProposeSong = () => {
  const [song, setSong] = useState('');
  const [artist, setArtist] = useState('');
  const { proposeSong, event } = useEvent();

  const handleProposeSong = () => {
    if (song && artist) {
      proposeSong(song, artist);
      setSong('');
      setArtist('');
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <div className="propose-song">
      <h2>Propose a Song for {event?.name}</h2>
      <input
        type="text"
        value={song}
        onChange={(e) => setSong(e.target.value)}
        placeholder="Song Title"
      />
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artist"
      />
      <button onClick={handleProposeSong}>Propose Song</button>
    </div>
  );
};

export default ProposeSong;
