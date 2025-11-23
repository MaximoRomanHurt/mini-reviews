const express = require("express");
const router = express.Router();
const controller = require("../controllers/reviews.controller");

router.get("/:movieId", controller.getByMovie);   // HU-3
router.post("/", controller.create);              // HU-4 ★ NUEVO

module.exports = router;
