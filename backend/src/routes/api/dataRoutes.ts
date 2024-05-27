import express from 'express';
import dataControllers from '../../controllers/api/dataControllers';
import messageControllers from '../../controllers/messageControllers';
import messageUploads from "../../lib/messageUploads"
import { Request, Response } from 'express';

const router = express.Router();

router.get('/arts', dataControllers.index);
router.get('/details/:id', dataControllers.loadDetails);
router.get('/featured', dataControllers.featuredArt);
router.post('/contact', messageUploads.array('attachments', 10), (req: Request, res: Response) => messageControllers.storeMessage(req, res));

export default router;