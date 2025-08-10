const Song = require('../models/songModels.js');

const getSongs = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const songs = await Song.find()
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json(songs);
};

const getSongById = async (req, res) => {
  const song = await Song.findById(req.params.id);
  res.json(song);
};

const getSongByNumber = async (req, res) => {
  const song = await Song.findOne({ number: req.params.num });
  res.json(song);
};

const searchSongs = async (req, res) => {
  const { q } = req.query;
  const songs = await Song.find({ $text: { $search: q } });
  res.json(songs);
};

const addSong = async (req, res) => {
  const newSong = new Song(req.body);
  await newSong.save();
  res.json(newSong);
};

module.exports = {
  getSongs,
  getSongById,
  getSongByNumber,
  searchSongs,
  addSong
};
