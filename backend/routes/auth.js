const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start Google OAuth
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account',
  accessType: 'online'
}));

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/login'
  }),
  (req, res) => {
    // Set a cookie to indicate successful login
    res.cookie('auth_success', 'true', {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    // Redirect to the frontend dashboard
    res.redirect('https://idealab-zeta.vercel.app/dashboard');
  }
);

// Update the user route to be more explicit
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ 
      user: req.user,
      isAuthenticated: true 
    });
  } else {
    res.json({ 
      user: null,
      isAuthenticated: false 
    });
  }
});

module.exports = router;
