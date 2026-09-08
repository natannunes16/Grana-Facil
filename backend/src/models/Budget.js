const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  limit: { type: Number, required: true },
  period: { type: String, required: true }, // e.g., '2026-09'
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
