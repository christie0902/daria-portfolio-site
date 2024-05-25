import express from 'express';
import artControllers from '../controllers/artControllers';
import upload from '../lib/fileUpload';

const router = express.Router();

router.get('/', artControllers.index);
router.get("/add", artControllers.add_art);
router.post("/", upload.array('images'), artControllers.post_art);
router.put("/:id", artControllers.update_art);
router.get("/:id", artControllers.art_details);
router.delete("/:id",artControllers.art_delete);


export default router;