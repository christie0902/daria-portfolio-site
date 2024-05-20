import express from 'express';
import messageControllers from '../controllers/messageControllers';
const router = express.Router();

router.get('/', messageControllers.loadMessages);

export default router;