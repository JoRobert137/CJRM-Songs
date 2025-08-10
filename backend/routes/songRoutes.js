const express = require('express');
const {
  getSongs,
  getSongById,
  getSongByNumber,
  searchSongs,
  addSong
} = require('../controllers/songController');

const router = express.Router();

router.get('/songs', getSongs);
router.get('/songs/:id', getSongById);
router.get('/songs/number/:num', getSongByNumber);
router.get('/search', searchSongs);
router.post('/add-songs', addSong);

module.exports = router;
