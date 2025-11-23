// backend/middleware/auth.middleware.js
// Middleware para proteger rutas; espera JWT en header Authorization: Bearer <token>

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization || req.cookies?.token;
  if (!authHeader) return res.status(401).json({ message: 'Falta token' });

  // soportar "Bearer <token>" o directamente token
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
