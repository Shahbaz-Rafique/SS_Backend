// models/Listing.js
const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  head: String,
  det: String,
  image: String, // Will store the image file path
  price: String,
  est: String,
  type: String,
  built: String,
  lotSize: String,
  pricePerSqft: String,
  description: String,
  daysOnZillow: String,
  agent: String,
  agency: String,
  source: String
});

module.exports = mongoose.model('Listing', ListingSchema);
