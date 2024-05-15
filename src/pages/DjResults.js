import React, { useEffect } from 'react';
import { useEvent } from '../context/EventContext';

const DjResults = () => {
  const { event, songs, fetchSongs, userRole } = useEvent();

  useEffect(() => {
    if (event) {
      fetchSongs(event.id);
    }
  }, [event, fetchSongs]);

  if (userRole !== 'dj') {
    return <div>Access Denied</div>;
  }

  if (!event) {
    return <div>No event selected</div>;
  }

  const topSongs = songs.sort((a, b) => b.votes - a.votes);

  return (
    <div className="dj-results">
      <h2>Results for {event.name}</h2>
      <h3>Top 10 Songs</h3>
      <ul>
        {topSongs.slice(0, 10).map((song, index) => (
          <li key={song.id}>
            {index + 1}. {song.title} by {song.artist} - {song.votes} votes
          </li>
        ))}
      </ul>
      <h3>Top 50 Songs</h3>
      <ul>
        {topSongs.slice(0, 50).map((song, index) => (
          <li key={song.id}>
            {index + 1}. {song.title} by {song.artist} - {song.votes} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DjResults;
