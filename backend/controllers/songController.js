const Song = require('../models/songModels.js');
const cloudinary = require("../config/cloudinary");

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

// Upload a song
const uploadSong = async (req, res) => {
  try {
    const { title, number, category } = req.body;

    if (!req.files || !req.files.song) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files.song;

    // Upload to Cloudinary (resource_type: "video" for audio/mp3)
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      upload_preset: "my_songs",
      resource_type: "video",
      folder: "cjrm-songs",
    });

    const newSong = new Song({
      title,
      number,
      category,
      url: result.secure_url,
    });

    await newSong.save();

    res.json({ message: "Song uploaded to Cloudinary!", song: newSong });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getSongs,
  getSongById,
  getSongByNumber,
  searchSongs,
  addSong,
  uploadSong
};
