// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/AdminUser');
const dotenv = require('dotenv');
dotenv.config();
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  // check if token exists
  if (token) {
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN_ADMIN, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'Invalid token' });
      } else {
        // decoded token contains user information
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Token required' });
  }
};

module.exports = { requireAuth };
