const mongoose = require('mongoose');

const leaseSchema = new mongoose.Schema({
  address: { type: String, required: true },
  location: { type: String, required: true },
  squareFeet: { type: Number, required: true },
  rentAmount:{type: Number, required: true },
  bedroomCount: { type: Number, required: true },
  bathroomCount: { type: Number, required: true },
  amenities: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Lease', leaseSchema);
