const Lease = require('../models/Lease');

// Controller function to handle lease form submission
const createLease = async (req, res) => {
  try {
    const { address, location, squareFeet, rentAmount,bedroomCount, bathroomCount, amenities } = req.body;

    // Create a new Lease instance
    const lease = new Lease({
      address,
      location,
      squareFeet,
      rentAmount,
      bedroomCount,
      bathroomCount,
      amenities
    });

    // Save to the database
    await lease.save();

    res.status(201).json({ message: 'Lease data saved successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while saving the lease data' });
  }
};


// Controller function to fetch all leases
const getLeases = async (req, res) => {
  try {
    const leases = await Lease.find(); // Fetch all leases from the database
    res.status(200).json(leases);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while fetching the lease data' });
  }
};
module.exports = {
  createLease,
  getLeases
};
