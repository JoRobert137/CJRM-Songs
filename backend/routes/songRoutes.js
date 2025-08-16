const express = require('express');
const path = require("path");
const {
  getSongs,
  getSongById,
  getSongByNumber,
  searchSongs,
  addSong,
  uploadSong,
  downloadSongs,
  updateLyrics
} = require('../controllers/songController');

const router = express.Router();

// POST upload song
router.post("/upload", uploadSong);

// GET to fetch all songs for Download
router.get('/download-songs', downloadSongs);

router.get('/songs', getSongs);
router.get('/songs/:id', getSongById);
router.get('/songs/number/:num', getSongByNumber);
router.get('/search', searchSongs);
router.post('/add-songs', addSong);
router.patch('/add-lyrics', updateLyrics);

module.exports = router;
