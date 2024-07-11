// backend/routes/tenantRoutes.js
const express = require('express');
const multer = require('multer');
const { createTenant } = require('../controllers/tenantController');

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
router.post('/tenants', upload.single('file'), createTenant);

module.exports = router;