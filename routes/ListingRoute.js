// backend/routes/tenantRoutes.js
const express = require('express');
const multer = require('multer');
const { createListing } = require('../controllers/listingsubformController');

const router = express.Router();

// Configure multer for file upload handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save uploads to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Route to handle tenant form submission
router.post('/listing', upload.single('file'), createListing);

module.exports = router;