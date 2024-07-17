

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
  // Add any other fields if required
});

module.exports = mongoose.model('AdminUser', UserSchema);
