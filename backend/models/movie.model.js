// backend/models/movie.model.js
// Esquema Movie según HU-1
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  movieId: { type: String, required: true, unique: true, index: true }, // e.g. IMDB id
  title: { type: String, required: true },
  originalTitle: { type: String },
  overview: { type: String },
  genres: [{ type: String, index: true }],
  platforms: [{ type: String, index: true }], // e.g. ['Netflix', 'Prime']
  releaseDate: { type: Date },
  year: { type: Number },
  runtime: { type: Number }, // minutos
  posterPath: { type: String },   // URL o ruta relativa
  backdropPath: { type: String }, // URL o ruta relativa
  popularity: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);

const wToken = localStorage.getItem("token");

document.getElementById("watchBtn").addEventListener("click", async () => {
  if (!wToken) return window.location.href = "/login";

  const body = {
    itemId: "{{ movie.movieId }}",
    itemType: "movie",
    poster: "{{ movie.posterPath }}",
    title: "{{ movie.title }}",
    year: "{{ movie.year }}"
  };

  const res = await fetch("http://localhost:4000/api/watchlist/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${wToken}`
    },
    body: JSON.stringify(body)
  });

  const d = await res.json();
  alert(d.message);
});

