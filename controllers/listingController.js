
// controllers/listingController.js
const Listing = require('../models/Listing');

// controllers/listingController.js
exports.createListing = async (req, res) => {
    try {
      const listingData = { ...req.body };
      if (req.file) {
        listingData.image = `/uploads/${req.file.filename}`; // Store the relative path
      }
      const newListing = new Listing(listingData);
      const savedListing = await newListing.save();
      res.status(201).json(savedListing);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
