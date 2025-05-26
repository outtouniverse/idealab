const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth routes
router.get(
  '/google',
  (req, res, next) => {
    console.log('Starting Google OAuth...');
    passport.authenticate('google', { 
      scope: ['profile', 'email'],
      prompt: 'select_account'
    })(req, res, next);
  }
);

router.get(
  '/google/callback',
  (req, res, next) => {
    console.log('Received Google callback...');
    passport.authenticate('google', { 
      failureRedirect: '/login',
      session: true
    })(req, res, next);
  },
  (req, res) => {
    try {
      console.log('Authentication successful, setting cookies...');
      // Set a cookie to indicate successful login
      res.cookie('auth_success', 'true', {
        httpOnly: false,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      
      // Redirect to the frontend dashboard
      res.redirect('https://idealab-zeta.vercel.app/dashboard');
    } catch (error) {
      console.error('Error in callback handler:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// User route
router.get('/user', (req, res) => {
  try {
    console.log('Checking user authentication status...');
    if (req.isAuthenticated()) {
      console.log('User is authenticated:', req.user);
      res.json({ 
        user: req.user,
        isAuthenticated: true 
      });
    } else {
      console.log('User is not authenticated');
      res.json({ 
        user: null,
        isAuthenticated: false 
      });
    }
  } catch (error) {
    console.error('Error in /user route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  try {
    console.log('Attempting to logout...');
    req.logout((err) => {
      if (err) {
        console.error('Error during logout:', err);
        return res.status(500).json({ error: 'Error logging out' });
      }
      console.log('Logout successful, clearing cookies...');
      res.clearCookie('connect.sid');
      res.clearCookie('auth_success');
      res.json({ message: 'Logged out successfully' });
    });
  } catch (error) {
    console.error('Error in logout route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
