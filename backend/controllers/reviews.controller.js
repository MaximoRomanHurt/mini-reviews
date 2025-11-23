// backend/controllers/reviews.controller.js
const Review = require('../models/review.model');

// GET /api/reviews/:movieId
exports.getByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });

    // Calcular promedio
    let avg = 0;
    if (reviews.length > 0) {
      avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    }

    res.json({
      average: Number(avg.toFixed(1)),
      total: reviews.length,
      reviews
    });

  } catch (err) {
    res.status(500).json({ message: "Error obteniendo reseñas", error: err.message });
  }
};

const Review = require('../models/review.model');

// POST /api/reviews
exports.create = async (req, res) => {
  try {
    const { movieId, rating, comment, username } = req.body;

    if (!movieId || !rating) {
      return res.status(400).json({ message: "movieId y rating son obligatorios" });
    }

    const review = await Review.create({
      movieId,
      rating,
      comment,
      username: username || "Anónimo"
    });

    res.json({ success: true, review });

  } catch (err) {
    res.status(500).json({ message: "Error creando reseña", error: err.message });
  }
};
