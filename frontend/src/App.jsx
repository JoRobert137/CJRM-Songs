import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SongDetail from './pages/SongDetail';
import SongsPage from './pages/Song';
import SongUpload from './pages/SongUpload';
import DownloadSongs from './pages/DownloadSongs';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/songs/:id" element={<SongDetail />} />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/upload-songs" element={<SongUpload />} />
        <Route path="/download" element={<DownloadSongs />} />
      </Routes>
    </Router>
  );
}