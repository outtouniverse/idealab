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
    failureRedirect: 'https://idealab-zeta.vercel.app/login',
    session: true
  }),
  (req, res) => {
    // Set a cookie to indicate successful login
    res.cookie('auth', 'true', {
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    // Redirect to dashboard
    res.redirect('https://idealab-zeta.vercel.app/dashboard');
  }
);

// Logout route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Error logging out' });
    }
    // Clear the session cookie
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Error destroying session' });
      }
      res.clearCookie('connect.sid');
      res.json({ success: true });
    });
  });
});

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

module.exports = router;
