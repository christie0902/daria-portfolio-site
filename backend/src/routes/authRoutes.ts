import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';

declare module 'express-session' {
    interface Session {
      user?: any;
    }
  }

const router = express.Router();

// Login page route
router.get('/login', (req, res) => {
  res.render('login', { error: req.flash('error') });
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        req.flash('error', 'Invalid username or password');
        return res.redirect('/login');
      }
  
      // Ensure user is not null before accessing password
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (isMatch) {
          req.session.user = user;
          req.flash('success', 'Successfully logged in');
          return res.redirect('admin/arts');
        } else {
          req.flash('error', 'Invalid username or password');
          return res.redirect('/login');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      req.flash('error', 'Something went wrong');
      res.redirect('/login');
    }
  });

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('admin/arts');
    }

    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

export default router;