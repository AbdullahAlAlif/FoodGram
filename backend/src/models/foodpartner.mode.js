const mongoose = require('mongoose');
const foodPartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  email: { type: String, required: true , unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('foodpartner', foodPartnerSchema);