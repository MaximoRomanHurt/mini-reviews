// backend/routes/movies.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies.controller');

router.get('/', controller.getAll);       // GET /api/movies
router.get('/:id', controller.getById);   // GET /api/movies/:id
router.post('/', controller.create);      // POST /api/movies (opcional)

module.exports = router;
