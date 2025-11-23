// backend/controllers/watchlist.controller.js
// Implementación HU-8 — Watchlist

const Watchlist = require('../models/watchlist.model');

// =============================
// GET /api/watchlist (mi lista)
// =============================
exports.getMyList = async (req, res) => {
  try {
    const list = await Watchlist.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo watchlist", error: err.message });
  }
};

// =============================
// POST /api/watchlist/add
// =============================
exports.add = async (req, res) => {
  try {
    const { itemId, itemType, poster, title, year } = req.body;

    await Watchlist.create({
      userId: req.userId,
      itemId,
      itemType,
      poster,
      title,
      year
    });

    res.json({ success: true, message: "Añadido a tu lista" });

  } catch (err) {
    if (err.code === 11000) {
      return res.json({ success: false, message: "Ya está en tu lista" });
    }
    res.status(500).json({ message: "Error al agregar", error: err.message });
  }
};

// =============================
// DELETE /api/watchlist/remove/:itemId
// =============================
exports.remove = async (req, res) => {
  try {
    const { itemId } = req.params;

    await Watchlist.deleteOne({ userId: req.userId, itemId });

    res.json({ success: true, message: "Eliminado de tu lista" });

  } catch (err) {
    res.status(500).json({ message: "Error al eliminar", error: err.message });
  }
};
