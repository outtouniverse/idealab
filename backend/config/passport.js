const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const mongoose = require('mongoose');

// Create a function to initialize passport
async function initializePassport(passport) {
  // Wait for MongoDB connection
  await mongoose.connection.asPromise();

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://idealab-ax37.vercel.app/auth/google/callback",
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            return done(null, user);
          }

          // If not, create new user
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value
          });

          return done(null, user);
        } catch (error) {
          console.error('Error in Google Strategy:', error);
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
}

module.exports = initializePassport;
