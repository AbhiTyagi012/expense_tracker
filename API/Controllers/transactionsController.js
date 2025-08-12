const Transaction = require('../../models/Transaction');
const Category = require('../../models/Category');
const mongoose = require('mongoose');

exports.listTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20, type, q, startDate, endDate, category } = req.query;
    const skip = (page - 1) * limit;
    const filter = { user: new mongoose.Types.ObjectId(userId) };

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (startDate || endDate) filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
    if (q) filter.description = { $regex: q, $options: 'i' };

    const [total, items] = await Promise.all([
      Transaction.countDocuments(filter),
      Transaction.find(filter)
        .populate('category')
        .sort({ date: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean()
    ]);

    res.json({ total, page: parseInt(page), limit: parseInt(limit), items });
  } catch (err) {
    res.status(500).json({ message: 'Failed to list transactions', error: err.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, type, category, date, description } = req.body;
    const t = new Transaction({ user: userId, amount, type, category, date, description });
    await t.save();
    res.status(201).json({ message: 'Transaction created', transaction: t });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create transaction', error: err.message });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const t = await Transaction.findById(id).populate('category').lean();
    if (!t) return res.status(404).json({ message: 'Not found' });
    if (t.user.toString() !== userId && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    res.json({ transaction: t });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const existing = await Transaction.findById(id);
    if (!existing) return res.status(404).json({ message: 'Not found' });
    if (existing.user.toString() !== userId && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    const data = req.body;
    Object.assign(existing, data);
    await existing.save();
    res.json({ message: 'Updated', transaction: existing });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const existing = await Transaction.findById(id);
    if (!existing) return res.status(404).json({ message: 'Not found' });
    if (existing.user.toString() !== userId && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await existing.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
