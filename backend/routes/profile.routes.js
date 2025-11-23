const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/profile.controller");

// Protegidas con auth
router.get("/", auth, controller.getProfile);
router.put("/update", auth, controller.updateProfile);
router.put("/password", auth, controller.changePassword);

module.exports = router;
