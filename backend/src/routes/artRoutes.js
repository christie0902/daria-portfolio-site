const express = require('express');
const artControllers = require('../controllers/artControllers');
const router = express.Router();

router.get('/', artControllers.index);
router.get("/add", artControllers.add_art);
router.post("/", artControllers.post_art);
router.get("/:id", artControllers.art_details);
router.delete("/:id",artControllers.art_delete);

module.exports = router;