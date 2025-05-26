const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/login',
    session: true
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

// User route
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

// Logout route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error logging out' });
    }
    res.clearCookie('connect.sid');
    res.clearCookie('auth_success');
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
