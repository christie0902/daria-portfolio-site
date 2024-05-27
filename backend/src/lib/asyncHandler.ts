import { Request, Response, NextFunction, RequestHandler } from 'express';

// Custom type to extend Express Request with Multer files
interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

// Helper function to wrap async route handlers
const asyncHandler = (fn: (req: MulterRequest, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req as MulterRequest, res, next).catch(next);
  };
};

export { MulterRequest, asyncHandler };