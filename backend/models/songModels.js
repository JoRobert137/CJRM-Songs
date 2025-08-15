const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  number: { type: Number, unique: true, required: true },
  title: { type: String, required: true },
  lyrics_tamil: String,
  lyrics_english : String,
}, { timestamps: true });

songSchema.index({ title: 'text', lyrics_tamil: 'text', lyrics_english: 'text' });

module.exports = mongoose.model('Song', songSchema);