import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const BASE_URL = 'https://cjrm-songs.onrender.com';

  useEffect(() => {
    axios.get(`${BASE_URL}/songs`).then(res => setSongs(res.data));
  }, []);

  // Filter songs by title or number (case-insensitive)
  const filteredSongs = songs.filter(song => {
    const term = searchTerm.toLowerCase();
    return (
      song.title.toLowerCase().includes(term) ||
      song.number.toString().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 p-6 flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4 text-center">
          🎵 Church Songs
        </h1>
        <p className="text-gray-600 mb-6 text-lg text-center">
          Welcome! Search and view our song collection in both Tamil and Roman Tamil.
        </p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by song name or number..."
          className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {/* Songs List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredSongs.length === 0 ? (
            <p className="text-gray-500 text-center">No songs found.</p>
          ) : (
            filteredSongs.map(song => (
              <Link
                to={`/songs/${song._id}`}
                key={song._id}
                className="block bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg px-4 py-3 shadow-sm transition"
              >
                <span className="font-semibold text-purple-700 mr-2">{song.number}.</span>
                <span className="text-purple-900">{song.title}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
