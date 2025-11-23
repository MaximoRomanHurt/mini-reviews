// backend/controllers/search.controller.js
// Implementación HU-10 — Búsqueda Global
// Refiere a requerimientos: /mnt/data/HU.txt

const Movie = require('../models/movie.model');
const TVShow = require('../models/tvshow.model');

exports.search = async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.json({ movies: [], tv: [] });

    const regex = new RegExp(q, "i");

    const movies = await Movie.find({
      $or: [{ title: regex }, { overview: regex }]
    }).limit(40);

    const tv = await TVShow.find({
      $or: [{ title: regex }, { overview: regex }]
    }).limit(40);

    res.json({
      q,
      movies,
      tv
    });

  } catch (err) {
    res.status(500).json({ message: "Error en búsqueda", error: err.message });
  }
};
