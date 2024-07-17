
// routes/listingRoutes.js
const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const upload = require('../middleware/listingmulterConfig');

router.post('/listings', upload.single('image'), listingController.createListing);
router.get('/listings', listingController.getAllListings);

module.exports = router;
