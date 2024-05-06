import express from 'express';
import artControllers from '../controllers/artControllers';
const router = express.Router();

router.get('/', artControllers.index);
router.get("/add", artControllers.add_art);
router.post("/", artControllers.post_art);
router.get("/:id", artControllers.art_details);
router.delete("/:id",artControllers.art_delete);

export default router;