const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  value: { type: Number, required: true },
  type: { type: String, enum: ['in', 'out'], required: true },
  date: { type: Date, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paymentMethod: { type: String },
  tags: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
