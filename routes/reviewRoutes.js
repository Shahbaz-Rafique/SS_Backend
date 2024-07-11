// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post a new review
router.post('/reviews', async (req, res) => {
  const review = new Review({
    name: req.body.name,
    comment: req.body.comment,
    rating: req.body.rating
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
