const express = require('express');
const multer = require("multer");
const path = require("path");
const {
  getSongs,
  getSongById,
  getSongByNumber,
  searchSongs,
  addSong,
  uploadSong
} = require('../controllers/songController');

const router = express.Router();

// POST upload song
router.post("/upload", uploadSong);

router.get('/songs', getSongs);
router.get('/songs/:id', getSongById);
router.get('/songs/number/:num', getSongByNumber);
router.get('/search', searchSongs);
router.post('/add-songs', addSong);

module.exports = router;
