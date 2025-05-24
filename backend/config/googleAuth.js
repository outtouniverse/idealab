require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction 
  ? 'https://idealab-ax37.vercel.app'  // Your Vercel backend URL
  : 'http://localhost:3000';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('Missing Google OAuth credentials');
  process.exit(1);
}

module.exports = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${baseUrl}/auth/google/callback`,
  proxy: true,
  passReqToCallback: true
};
