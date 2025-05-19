const express = require('express');
const router = express.Router();
const IdeaLab = require('../models/IdeaLab');

// Middleware to check authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

// Route to get all IdeaLabs for the current user
router.get('/all', ensureAuthenticated, async (req, res) => {
  try {
    const allIdeaLabs = await IdeaLab.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ success: true, idealabs: allIdeaLabs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Route to get recent IdeaLabs for the current user
router.get('/recent', ensureAuthenticated, async (req, res) => {
  try {
    const recentIdeaLabs = await IdeaLab.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .limit(3);
    res.json({ success: true, idealabs: recentIdeaLabs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/new', ensureAuthenticated, async (req, res) => {
  try {
    const { title, idea } = req.body;
    if (!title || !idea) {
      return res.status(400).json({ success: false, error: "Title and idea are required" });
    }
    const newIdeaLab = new IdeaLab({
      title,
      idea,
      createdBy: req.user._id,
    });
    await newIdeaLab.save();
    res.status(201).json({ success: true, idealab: newIdeaLab });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Route to update output
router.post('/save-output/:id', ensureAuthenticated, async (req, res) => {
  try {
    const { output } = req.body;
    const idealab = await IdeaLab.findByIdAndUpdate(
      req.params.id,
      { output },
      { new: true }
    );
    if (!idealab) {
      return res.status(404).json({ success: false, error: "IdeaLab not found" });
    }
    res.json({ success: true, idealab });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Route to get a specific IdeaLab by ID (this should be last)
router.get('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const idealab = await IdeaLab.findById(req.params.id);
    if (!idealab) {
      return res.status(404).json({ success: false, error: "IdeaLab not found" });
    }
    res.json({ success: true, idealab });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
