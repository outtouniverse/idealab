require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction 
  ? 'https://idealab-ax37.vercel.app'  // Your Vercel backend URL
  : 'http://localhost:3000';

module.exports = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${baseUrl}/auth/google/callback`,
  proxy: true // Add this to handle proxy headers
};
