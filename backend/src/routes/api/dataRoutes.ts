import express from 'express';
import dataControllers from '../../controllers/api/dataControllers';
import messageControllers from '../../controllers/messageControllers';
const router = express.Router();

router.get('/arts', dataControllers.index);
router.get('/featured', dataControllers.featuredArt);
router.post('/contact', messageControllers.storeMessage);

export default router;