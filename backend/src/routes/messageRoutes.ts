import express from 'express';
import messageControllers from '../controllers/messageControllers';
const router = express.Router();

router.get('/', messageControllers.loadMessages);
router.put('/:id/update', messageControllers.updateNote);
router.delete('/:id/delete', messageControllers.deleteMessage)

export default router;