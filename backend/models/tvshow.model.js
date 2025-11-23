const mongoose = require('mongoose');

const SeasonSchema = new mongoose.Schema({
  seasonNumber: Number,
  episodeCount: Number
}, { _id: false });

const TVShowSchema = new mongoose.Schema({
  showId: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  overview: { type: String },
  genres: [{ type: String }],
  platforms: [{ type: String }],
  year: Number,
  seasons: [SeasonSchema],
  posterPath: String,
  backdropPath: String,
  popularity: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('TVShow', TVShowSchema);
