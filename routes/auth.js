// routes/auth.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to verify token
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Naming convention for uploaded files
  }
});

const upload = multer({ storage: storage });



router.post('/signup', upload.single('profilePicture'), async (req, res) => {
  const { email, username, password } = req.body;

  // console.log('Received signup request:', { email, username });

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log('Password hashed successfully');

    // Create a new user
    user = new User({
      email,
      username,
      password: hashedPassword,
     
      profilePicture: req.file ? `/uploads/${req.file.filename}` : null,
    });

    // Save the user to the database
    await user.save();
    // console.log('User saved to the database:', user);

    // Create a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_SECRET_TOKEN, // Replace with a secure key in production
      { expiresIn: '1h' }
    );
    // console.log('JWT token generated:', token);

    // Send the token as a response
    res.json({ token });
  } catch (err) {
    // console.error('Error during signup:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare entered password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and return JWT token for authentication
    const payload = {
      id: user.id, // Ensure user ID is included in the payload
      username: user.username
    };

    jwt.sign(
      payload,
      process.env.ACCESS_SECRET_TOKEN, // Replace with your JWT secret key
      { expiresIn: 3600 }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Upload profile picture route
router.post('/uploadProfilePicture', authMiddleware, upload.single('profilePicture'), async (req, res) => {
  try {
    // Ensure file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Update user's profile picture URL in the database
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture: `/uploads/${req.file.filename}` },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile picture updated', profilePicture: user.profilePicture });
  } catch (err) {
    // console.error('Error uploading profile picture:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get current user details route
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    // console.error('Error fetching user data:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;