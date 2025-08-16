import { useState } from "react";
import axios from "axios";

export default function SongUpload() {
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [category, setCategory] = useState("");
  const [lyricsTamil, setLyricsTamil] = useState("");
  const [lyricsEnglish, setLyricsEnglish] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = "hhttps://cjrm-songs.onrender.com";

  // Function to automatically add \n after sentence-ending punctuation
  const formatLyricsAutoNewline = (lyrics) => {
    if (!lyrics) return "";
    return lyrics.replace(/([.!?])\s+/g, "$1\n");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!songFile) {
      setMessage("Please select an audio file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("number", number);
    formData.append("category", category);
    formData.append("lyrics_tamil", formatLyricsAutoNewline(lyricsTamil));
    formData.append("lyrics_english", formatLyricsAutoNewline(lyricsEnglish));
    formData.append("song", songFile);

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000, // 1 min timeout for big files
      });

      if (res.status === 200) {
        setMessage("✅ Song uploaded successfully!");
        setTitle("");
        setNumber("");
        setCategory("");
        setLyricsTamil("");
        setLyricsEnglish("");
        setSongFile(null);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Upload Song
      </h2>
      {message && <p className="text-center mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Song Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Lyrics (Tamil)"
          value={lyricsTamil}
          onChange={(e) => setLyricsTamil(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Lyrics (English)"
          value={lyricsEnglish}
          onChange={(e) => setLyricsEnglish(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setSongFile(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-pink-500 text-white"
          }`}
        >
          {loading ? "Uploading..." : "Upload Song"}
        </button>
      </form>
    </div>
  );
}
