import { useEffect, useState } from "react";

export default function DownloadSongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://cjrm-songs.onrender.com";

  useEffect(() => {
    fetch(`${BASE_URL}/download-songs`) // your backend route that returns only songs with audio
      .then(res => res.json())
      .then(data => {
        setSongs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const downloadFile = (url, title) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = title; // downloaded file gets the song title
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = () => {
    songs.forEach(song => downloadFile(song.url, song.title));
  };

  if (loading) return <p className="text-center mt-20 text-lg">Loading songs...</p>;

  if (!songs.length) return <p className="text-center mt-20 text-lg">No downloadable songs available.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Download Songs</h1>

      <div className="text-center mb-6">
        <button
          onClick={downloadAll}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-pink-500 transition-colors"
        >
          Download All Songs
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map(song => (
          <div
            key={song._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <span className="font-medium">{song.title}</span>
            <button
              onClick={() => downloadFile(song.url, song.title)}
              className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-pink-500 transition-colors"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
