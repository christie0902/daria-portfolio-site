import express from 'express';
import dataControllers from '../../controllers/api/dataControllers';
import messageControllers from '../../controllers/messageControllers';
import { Request, Response } from 'express';
import multer from "multer"; 
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


const cloudinaryMsgPicUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary, 
    //@ts-ignore   //HACKY: TS not recognizing correct types for cloudinary API
    params: {folder: "portfolio", resource_type: "image"},
  })
}).array("image")

const router = express.Router();

router.get('/arts', dataControllers.index);
router.get('/details/:id', dataControllers.loadDetails);
router.get('/featured', dataControllers.featuredArt);
router.post('/contact', cloudinaryMsgPicUploader, async (req: Request, res: Response) => messageControllers.saveMessage(req, res));
//router.post('/contact', messageUploads.array('attachments', 10), (req: Request, res: Response) => messageControllers.storeMessage(req, res));

export default router;