const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Receita', 'Despesa', 'Ambos'], default: 'Ambos' },
  icon: { type: String }, // emoji or string identifier
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
