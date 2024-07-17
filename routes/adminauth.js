
const express = require('express');
const dotenv = require('dotenv');
const User = require('../models/AdminUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/adminauthMiddleware');

dotenv.config();
const router = express.Router();

// router.post('/signup-admin', async (req, res) => {
//   const { email, password } = req.body;

//   console.log('Received signup request:', { email, password });

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({
//       email,
//       password: hashedPassword,
//     });

//     await user.save();
//     const token = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET_TOKEN_ADMIN, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     console.error('Error during signup:', err.message);
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// });

router.post('/login-admin', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request received:', { email, password });

  try {
    let user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found for email: ${email}`);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Password mismatch for email: ${email}`);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      id: user.id,
    };

    jwt.sign(
      payload,
      process.env.ACCESS_SECRET_TOKEN_ADMIN,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        console.log(`Login successful for email: ${email}`);
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;