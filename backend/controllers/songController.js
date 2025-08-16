const fs = require("fs");
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
    const { title, number, category, lyrics_tamil, lyrics_english } = req.body;
    const file = req.files.song;
    const songName = req.body.songName || title || "Unknown_Song";

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "video",
      folder: "cjrm-songs",
      public_id: songName,
      use_filename: true,
      unique_filename: false,
    });

    // Generate download link with song name
    const downloadUrl = result.secure_url.replace(
      "/upload/",
      `/upload/fl_attachment:${encodeURIComponent(songName)}/`
    );

    fs.unlinkSync(file.tempFilePath);

    // Create a new song document with audio info
    const newSong = new Song({
      title,
      number,
      category,
      lyrics_tamil,
      lyrics_english,
      url: result.secure_url,
      hasAudio: true
    });

    await newSong.save();

    res.json({
      message: "Song uploaded successfully",
      songName,
      song: newSong
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading song" });
  }
};

const downloadSongs = async (req, res) => {
  try {
    const songs = await Song.find({ hasAudio: true }); // Only songs with uploaded audio
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs" });
  }
};

const updateLyrics = async (req, res) => {
  try {
    const { songId } = req.params;
    const { lyrics_tamil, lyrics_english } = req.body;

    const song = await Song.findById(songId);

    if (!song) return res.status(404).json({ message: "Song not found" });

    song.lyrics_tamil = lyrics_tamil || song.lyrics_tamil;
    song.lyrics_english = lyrics_english || song.lyrics_english;

    await song.save();

    res.json({ message: "Lyrics updated successfully", song });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating lyrics" });
  }
};

module.exports = {
  getSongs,
  getSongById,
  getSongByNumber,
  searchSongs,
  addSong,
  uploadSong,
  downloadSongs,
  updateLyrics
};
