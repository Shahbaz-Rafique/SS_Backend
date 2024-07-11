const mongoose = require('mongoose');

const listingsubformSchema = new mongoose.Schema({

    file: { type: String, required: true } 
});

const Listingsubform = mongoose.model('ListingSubForm',  listingsubformSchema);

module.exports = Listingsubform;
