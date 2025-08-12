const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income','expense'], required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

TransactionSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Transaction', TransactionSchema);
