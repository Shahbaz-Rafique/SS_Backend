// routes/admin.js

const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

// Example admin route
router.get('/dashboard', requireAuth, (req, res) => {
  // Only authenticated users can access this route
  res.json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;
