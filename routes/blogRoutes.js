const express = require('express');
const multer = require('multer');
const { createBlog, getBlogs, getBlogById } = require('../controllers/blogController');

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to create a blog post with image upload
router.post('/blogs', upload.single('image'), createBlog);

router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById); // Ensure this route is correctly defined

module.exports = router;
