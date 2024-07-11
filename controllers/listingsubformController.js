// backend/controllers/tenantController.js
const ListingSubForm= require('../models/ListingSubForm');

const createListing= async (req, res) => {
  try {
     const file = req.file;

    const newListingSubForm = new ListingSubForm({
    
      file: file ? file.path : null // Save the file path if available
    });

    await newListingSubForm.save();
    res.status(201).json({ message: 'Listing file created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createListing
};
