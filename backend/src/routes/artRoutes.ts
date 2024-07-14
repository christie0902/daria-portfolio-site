import express from 'express';
import artControllers from '../controllers/artControllers';
import { Request, Response } from 'express';
import multer from "multer"; 
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


const cloudinaryMsgPicUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary, 
    //@ts-ignore   //HACKY: TS not recognizing correct types for cloudinary API
    params: {folder: "portfolio", resource_type: "image"},
  }),
  limits: { fileSize: 1024 * 1024 }
}).array("image")


const router = express.Router();

router.get('/', artControllers.index);
router.get("/add", artControllers.add_art);
router.post("/", cloudinaryMsgPicUploader, (req: Request, res: Response) => artControllers.post_art(req, res));
//router.post("/", upload.array('images', 10), (req: Request, res: Response) => artControllers.post_art(req, res));
router.put("/:id", artControllers.update_art);
router.get("/:id", artControllers.art_details);
router.delete('/:id', artControllers.art_soft_delete);
router.post('/recover/:id', artControllers.art_recover);
router.delete('/permanent/:id', artControllers.art_hard_delete);

export default router;