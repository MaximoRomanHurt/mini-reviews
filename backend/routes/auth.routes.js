// backend/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const auth = require('../middleware/auth.middleware');

router.post('/register', controller.register); // POST /api/auth/register
router.post('/login', controller.login);       // POST /api/auth/login
router.get('/me', auth, controller.me);        // GET /api/auth/me (protegida)

module.exports = router;
