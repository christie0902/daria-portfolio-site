import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
    interface Session {
      user?: any;
    }
  }

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user?.username) {
    return next();
  }
  req.flash('error', 'Please log in to access');
  res.redirect('/login');
};