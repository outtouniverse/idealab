const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const mongoose = require('mongoose');

// Create a function to initialize passport
async function initializePassport(passport) {
  try {
    // Wait for MongoDB connection
    await mongoose.connection.asPromise();
    console.log('MongoDB connection verified for passport initialization');

    // Define the Google strategy
    const googleStrategy = new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://idealab-ax37.vercel.app/auth/google/callback",
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('Google strategy callback received:', profile.id);
          
          // Check if user already exists
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            console.log('Existing user found:', user.email);
            return done(null, user);
          }

          // If not, create new user
          console.log('Creating new user for:', profile.emails[0].value);
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value
          });

          console.log('New user created successfully');
          return done(null, user);
        } catch (error) {
          console.error('Error in Google Strategy callback:', error);
          return done(error, null);
        }
      }
    );

    // Register the strategy with passport
    passport.use('google', googleStrategy);
    console.log('Google strategy registered successfully');

    passport.serializeUser((user, done) => {
      try {
        console.log('Serializing user:', user.id);
        done(null, user.id);
      } catch (error) {
        console.error('Error in serializeUser:', error);
        done(error, null);
      }
    });

    passport.deserializeUser(async (id, done) => {
      try {
        console.log('Deserializing user:', id);
        const user = await User.findById(id);
        done(null, user);
      } catch (error) {
        console.error('Error in deserializeUser:', error);
        done(error, null);
      }
    });

  } catch (error) {
    console.error('Error initializing passport:', error);
    throw error;
  }
}

module.exports = initializePassport;
