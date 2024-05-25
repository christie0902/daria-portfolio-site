import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from "express";

// Function to handle errors in the callback
const handleError = (cb: (error: Error | null, destination?: string) => void, error: Error) => {
  console.error("Error in multer storage:", error);
  cb(error);
};

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;