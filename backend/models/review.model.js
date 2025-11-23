const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  movieId: { type: String, required: true, index: true },
  userId: { type: String, default: "anon" },
  username: { type: String, default: "Anónimo" },

  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, default: "" },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
