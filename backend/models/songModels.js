const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  number: { type: Number, unique: true, required: true },
  title: { type: String, required: true },
  category: String,            // optional: could be praise, worship, etc.
  url: String,                 // Cloudinary audio URL
  downloadUrl: String,         // Optional download URL
  lyrics_tamil: String,
  lyrics_english: String,
  hasAudio: { type: Boolean, default: false } // true if audio exists
}, { timestamps: true });

// Enable text search for title and lyrics
songSchema.index({ title: 'text', lyrics_tamil: 'text', lyrics_english: 'text' });

module.exports = mongoose.model('Song', songSchema);
