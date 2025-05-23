const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  photo: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  bufferCommands: false,
  autoIndex: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
