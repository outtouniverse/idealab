const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleAuth = require('./googleAuth');
const User = require('../models/User');

// User serialization (for session support)
passport.serializeUser((user, done) => {
  try {
    console.log('Serializing user:', user.id);
    done(null, user.id);
  } catch (error) {
    console.error('Serialize Error:', error);
    done(error, null);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log('Deserializing user:', id);
    const user = await User.findById(id);
    if (!user) {
      console.error('User not found during deserialization');
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    console.error('Deserialize Error:', err);
    done(err, null);
  }
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      ...googleAuth,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('Google Profile:', profile); // Debug log
        
        // Try to find the user
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
          // If not found, create a new user
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
          });
          console.log('New user created:', user); // Debug log
        }
        
        return done(null, user);
      } catch (err) {
        console.error('Google Strategy Error:', err);
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
