const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
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
    failureRedirect: 'https://idealab-zeta.vercel.app/login?error=auth_failed',
    session: false // Disable session
  }),
  (req, res) => {
    try {
      // Generate JWT token
      const token = jwt.sign(
        { 
          id: req.user.id,
          email: req.user.email,
          displayName: req.user.displayName
        },
        process.env.JWT_SECRET || 'your-jwt-secret',
        { expiresIn: '24h' }
      );

      // Redirect to dashboard with token
      res.redirect(`https://idealab-zeta.vercel.app/dashboard?token=${token}`);
    } catch (error) {
      console.error('Callback Error:', error);
      res.redirect('https://idealab-zeta.vercel.app/login?error=callback_failed');
    }
  }
);

// Add a route to check authentication status
router.get('/user', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret');
    res.json({ user: decoded });
  } catch (error) {
    res.json({ user: null });
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
