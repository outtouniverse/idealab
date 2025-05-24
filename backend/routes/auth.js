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
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    // Redirect to dashboard with a force reload
    res.redirect('https://idealab-zeta.vercel.app/dashboard?auth=true');
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

// Add timeout handling to the user route
router.get('/user', async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // Set a timeout for the database operation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Database operation timed out')), 5000);
      });

      // Race between the database operation and the timeout
      const user = await Promise.race([
        Promise.resolve(req.user),
        timeoutPromise
      ]);

      res.json({ user });
    } else {
      res.json({ user: null });
    }
  } catch (error) {
    console.error('Error in /user route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
