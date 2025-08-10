import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function SongDetail() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  
  const BASE_URL = 'https://cjrm-songs.onrender.com';

  useEffect(() => {
    axios.get(`${BASE_URL}/songs/${id}`).then(res => setSong(res.data));
  }, [id]);

  if (!song) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 flex items-center justify-center">
      <p className="text-purple-700 font-semibold text-lg">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 p-6 flex justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6">
          {song.number}. {song.title}
        </h1>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-purple-800 mb-3">Tamil</h3>
          <div
            className="text-gray-800 whitespace-pre-wrap leading-relaxed"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {song.lyrics_tamil.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-purple-800 mb-3">English</h3>
          <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">{song.lyrics_english}</pre>
        </section>
        <br></br>
        <Link
          to="/"
          className="inline-block mb-6 text-purple-600 hover:text-purple-800 font-medium transition"
        >
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">← Back to Songs</button>
        </Link>
      </div>
      
    </div>
  );
}
