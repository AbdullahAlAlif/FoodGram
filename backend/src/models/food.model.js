const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  video: { type: String , required: true },
  likeCount: { type: Number, default: 0 },
  savesCount: { type: Number, default: 0 },
  foodPartner: { type: mongoose.Schema.Types.ObjectId, ref: 'foodpartner', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);