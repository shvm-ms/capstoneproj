// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateJWT, requireAdmin } = require('../controllers/authController');

// Get all users (admin only)
router.get('/', authenticateJWT, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

module.exports = router;