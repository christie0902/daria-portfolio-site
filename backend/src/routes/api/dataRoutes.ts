import express from 'express';
import dataControllers from '../../controllers/api/dataControllers';
const router = express.Router();

router.get('/arts', dataControllers.index);
router.get('/featured', dataControllers.featuredArt);

export default router;