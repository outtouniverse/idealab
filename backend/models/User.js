const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  photo: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  // Add these options for better performance
  bufferCommands: false,
  autoIndex: true
});

// Add indexes for frequently queried fields
userSchema.index({ googleId: 1 });
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
