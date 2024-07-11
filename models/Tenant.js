// backend/models/Tenant.js
const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  unit: { type: String, required: true },
  leaseInfo: { type: String, required: true },
  file: { type: String, required: true } // Store the file path
});

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
