const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    
  username: { type: String, required: true, unique: true },
  number: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  message:{type: String, required: true },
 
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
