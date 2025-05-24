const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start Google OAuth
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account',
  accessType: 'online'
}));

// Google OAuth callback with error handling
router.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate('google', { 
      failureRedirect: 'https://idealab-zeta.vercel.app/login',
      session: true
    })(req, res, (err) => {
      if (err) {
        console.error('Google OAuth Error:', err);
        return res.redirect('https://idealab-zeta.vercel.app/login?error=auth_failed');
      }
      next();
    });
  },
  (req, res) => {
    try {
      // Set a cookie to indicate successful login
      res.cookie('auth', 'true', {
        httpOnly: false,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      
      // Redirect to dashboard
      res.redirect('https://idealab-zeta.vercel.app/dashboard');
    } catch (error) {
      console.error('Callback Error:', error);
      res.redirect('https://idealab-zeta.vercel.app/login?error=callback_failed');
    }
  }
);

// Add a route to check authentication status
router.get('/user', (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.json({ user: null });
    }
  } catch (error) {
    console.error('Auth Check Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout Error:', err);
      return res.status(500).json({ success: false, error: 'Error logging out' });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Session Destroy Error:', err);
        return res.status(500).json({ success: false, error: 'Error destroying session' });
      }
      res.clearCookie('connect.sid', {
        secure: true,
        sameSite: 'none',
        httpOnly: true
      });
      res.clearCookie('auth', {
        secure: true,
        sameSite: 'none',
        httpOnly: false
      });
      res.json({ success: true });
    });
  });
});

module.exports = router;
