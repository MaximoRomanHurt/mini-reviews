const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const auth = require("../middleware/auth");

// =========================
// OBTENER MIS RESEÑAS
// =========================
router.get("/my-reviews", auth, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate("movieId", "title poster")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener reseñas" });
  }
});

// =========================
// ELIMINAR RESEÑA PROPIA
// =========================
router.delete("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review)
      return res.status(404).json({ error: "Reseña no encontrada" });

    if (review.user.toString() !== req.user.id)
      return res.status(403).json({ error: "No permitido" });

    await review.deleteOne();
    res.json({ message: "Reseña eliminada" });

  } catch (err) {
    res.status(500).json({ error: "Error al eliminar" });
  }
});

module.exports = router;
