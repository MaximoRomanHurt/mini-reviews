// backend/controllers/profile.controller.js
// Implementación HU-6 (ver / actualizar perfil)
// Refiere a requerimientos: /mnt/data/HU.txt

const User = require('../models/user.model');
const Review = require('../models/review.model');
const Watchlist = require('../models/watchlist.model'); // si ya existe
const bcrypt = require('bcryptjs');

// ===============================
// GET /api/profile (obtener perfil)
// ===============================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // estadisticas
    const reviews = await Review.find({ userId: req.userId });
    const totalReviews = reviews.length;
    let avgStars = 0;
    if (totalReviews > 0) {
      avgStars = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
    }

    const watchlistCount = await Watchlist.countDocuments({ userId: req.userId });

    res.json({
      user,
      stats: {
        totalReviews,
        avgStars: Number(avgStars.toFixed(2)),
        watchlistCount
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Error obteniendo perfil", error: err.message });
  }
};

// =====================================
// PUT /api/profile/update (actualizar user)
// =====================================
exports.updateProfile = async (req, res) => {
  try {
    const { username, email, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { username, email, avatar },
      { new: true }
    );

    res.json({ message: "Perfil actualizado", user });

  } catch (err) {
    res.status(500).json({ message: "Error actualizando perfil", error: err.message });
  }
};

// =====================================
// PUT /api/profile/password (cambiar password)
// =====================================
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.userId).select('+password');
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const match = await user.comparePassword(currentPassword);
    if (!match) return res.status(401).json({ message: "Contraseña actual incorrecta" });

    // actualizar
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });

  } catch (err) {
    res.status(500).json({ message: "Error al actualizar contraseña", error: err.message });
  }
};
