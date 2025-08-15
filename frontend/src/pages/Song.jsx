import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SongsPage() {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL = "https://cjrm-songs.onrender.com";

  useEffect(() => {
    axios.get(`${BASE_URL}/songs`).then((res) => setSongs(res.data));
  }, []);

  // Filter songs by title or number (case-insensitive)
  const filteredSongs = songs.filter((song) => {
    const term = searchTerm.toLowerCase();
    return (
      song.title.toLowerCase().includes(term) ||
      song.number.toString().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100 p-6 flex flex-col items-center">
      <Navbar />

      <div className="bg-white/90 rounded-2xl shadow-lg p-8 max-w-3xl w-full border border-blue-200">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 text-center">
          CJRM Songs
        </h1>
        <p className="text-pink-700 mb-6 text-lg text-center">
          Browse all songs or search
        </p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by song name or number..."
          className="w-full mb-6 px-4 py-3 rounded-lg border border-pink-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-blue-900 placeholder-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Songs List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredSongs.length === 0 ? (
            <p className="text-blue-500 text-center">No songs found.</p>
          ) : (
            filteredSongs.map((song) => (
              <Link
                to={`/songs/${song._id}`}
                key={song._id}
                className="block bg-gradient-to-r from-blue-50 to-pink-50 hover:from-pink-50 hover:to-blue-50 border border-blue-300 rounded-lg px-4 py-3 shadow-sm transition"
              >
                <span className="font-semibold text-blue-700 mr-2">
                  {song.number}.
                </span>
                <span className="text-pink-700">{song.title}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
