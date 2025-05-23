require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction 
  ? 'https://idealab-ax37.vercel.app'  // Your Vercel backend URL
  : 'http://localhost:3000';

module.exports = {
  clientID: '703416968026-2v4ntp1vhgo2advhjb84a1bret53rq6b.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${baseUrl}/auth/google/callback`,
};
