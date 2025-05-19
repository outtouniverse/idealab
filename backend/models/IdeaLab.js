const mongoose = require('mongoose');

const ideaLabSchema = new mongoose.Schema({
  title: { type: String, required: true },
  idea: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  output: { type: mongoose.Schema.Types.Mixed },
  // Add more fields as needed
});

module.exports = mongoose.model('IdeaLab', ideaLabSchema);
