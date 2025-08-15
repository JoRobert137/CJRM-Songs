import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const BASE_URL = "https://cjrm-songs.onrender.com";
  const categories = ["Praise", "Thanksgiving", "Devotion", "Worship"];

  // Fetch songs from API
  useEffect(() => {
    axios.get(`${BASE_URL}/songs`).then((res) => setSongs(res.data));
  }, []);

  // Update suggestions as user types
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = songs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.number.toString().includes(searchTerm)
      );
      setSuggestions(filtered.slice(0, 5)); // top 5 suggestions
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, songs]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-6 px-6 text-center relative text-blue-900">
        <h1 className="text-3xl font-extrabold mb-4">
          The people I formed for myself will declare My praise.
        </h1>
        <h3 className="text-xl font-extrabold mb-4">
          இந்த ஜனத்தை எனக்கென்று ஏற்படுத்தினேன்; இவர்கள் என் துதியை சொல்லிவருவார்கள்.
        </h3>
        <p className="text-xl font-extrabold mb-6">Isaiah 43 : 21</p>
      </section>

      {/* Search & Categories Box */}
      <section className="flex justify-center py-6 px-6 -mt-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-center mb-6">Search for Songs</h1>

          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search songs by name or number..."
            className="w-full max-w-md p-3 rounded-lg shadow-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all mb-3"
          />

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-sm mb-6">
              {suggestions.map((song) => (
                <Link
                  key={song._id}
                  to={`/songs/${song._id}`}
                  className="block px-4 py-3 hover:bg-blue-100 cursor-pointer"
                >
                  <span className="font-semibold text-blue-700 mr-2">{song.number}.</span>
                  <span className="text-blue-900">{song.title}</span>
                </Link>
              ))}
            </ul>
          )}

          {/* Categories */}
          <div className="w-full mt-6">
            <h2 className="text-xl font-semibold mb-3 text-center">Categories</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  className="px-4 py-2 bg-blue-200 text-blue-900 rounded-full hover:bg-blue-300 transition"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="mt-10 px-6 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-6">
        {[
          { name: "Songs", path: "/songs" },
          { name: "Download", path: "/download" },
          { name: "About", path: "/about" },
          { name: "Contact", path: "/contact" },
        ].map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition cursor-pointer text-center font-semibold"
          >
            {item.name}
          </Link>
        ))}
      </section>

      <Footer />
    </div>
  );
}
