const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/watchlist.controller");

router.get("/", auth, controller.getMyList);
router.post("/add", auth, controller.add);
router.delete("/remove/:itemId", auth, controller.remove);

module.exports = router;
