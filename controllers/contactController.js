const Contact = require('../models/Contact');
// Controller function to handle lease form submission
const createContact = async (req, res) => {
  try {
    const { username,
        number,
        email,
        message} = req.body;

    // Create a new Lease instance
    const contact = new Contact({
     username,
     number,
     email,
     message
    });

    // Save to the database
    await contact.save();

    res.status(201).json({ message: 'Contact data saved successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while saving the lease data' });
  }
};

module.exports = {
    createContact
 
  };
  
