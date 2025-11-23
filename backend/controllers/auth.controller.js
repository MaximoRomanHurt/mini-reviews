// backend/controllers/auth.controller.js
// Endpoints: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me
// Refiere a /mnt/data/HU.txt para requerimientos

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'; // configurable

function signToken(user) {
  // firmar con id y email (no incluir password)
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

exports.register = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email y password son obligatorios' });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email ya registrado' });

    const user = new User({ username, email, password, avatar });
    await user.save();

    const token = signToken(user);
    res.status(201).json({ token, user: user.toJSON() });
  } catch (err) {
    console.error('auth.register error:', err);
    res.status(500).json({ message: 'Error registrando usuario', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email y password requeridos' });

    // seleccionar password explícitamente
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = signToken(user);
    res.json({ token, user: user.toJSON() });
  } catch (err) {
    console.error('auth.login error:', err);
    res.status(500).json({ message: 'Error en login', error: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    // auth middleware debe haber añadido req.userId
    if (!req.userId) return res.status(401).json({ message: 'No autorizado' });
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    console.error('auth.me error:', err);
    res.status(500).json({ message: 'Error obteniendo usuario', error: err.message });
  }
};
