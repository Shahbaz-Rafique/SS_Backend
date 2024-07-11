// backend/controllers/tenantController.js
const Tenant = require('../models/Tenant');

const createTenant = async (req, res) => {
  try {
    const { name, email, phone, unit, leaseInfo } = req.body;
    const file = req.file;

    const newTenant = new Tenant({
      name,
      email,
      phone,
      unit,
      leaseInfo,
      file: file ? file.path : null // Save the file path if available
    });

    await newTenant.save();
    res.status(201).json({ message: 'Tenant created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createTenant
};
