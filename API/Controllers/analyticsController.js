const Transaction = require('../../models/Transaction');
const mongoose = require('mongoose');

function startOfMonthsAgo(n) {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  d.setMonth(d.getMonth() - n);
  return d;
}

exports.getMonthlyOverview = async (req, res) => {
  try {
    const userId = req.user.id;

    const pipeline = [
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $project: { month: { $dateToString: { format: '%Y-%m', date: '$date' } }, amount: '$amount', type: '$type' } },
      { $group: { _id: { month: '$month', type: '$type' }, total: { $sum: '$amount' } } },
      { $group: { _id: '$_id.month', totals: { $push: { type: '$_id.type', total: '$total' } } } },
      { $sort: { _id: 1 } }
    ];

    const result = await Transaction.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getYearlyOverview = async (req, res) => {
  try {
    const userId = req.user.id;

    const pipeline = [
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $project: { year: { $dateToString: { format: '%Y', date: '$date' } }, amount: '$amount', type: '$type' } },
      { $group: { _id: { year: '$year', type: '$type' }, total: { $sum: '$amount' } } },
      { $group: { _id: '$_id.year', totals: { $push: { type: '$_id.type', total: '$total' } } } },
      { $sort: { _id: 1 } }
    ];

    const result = await Transaction.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategoryDistribution = async (req, res) => {
  try {
    const userId = req.user.id;

    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const pipeline = [
      { $match: { user: new mongoose.Types.ObjectId(userId), type: 'expense', date: { $gte: start } } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'cat' } },
      { $unwind: '$cat' },
      { $project: { _id: 0, category: '$cat.name', total: 1 } },
      { $sort: { total: -1 } }
    ];

    const result = await Transaction.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getIncomeVsExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    const pipeline = [
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $project: { month: { $dateToString: { format: '%Y-%m', date: '$date' } }, amount: '$amount', type: '$type' } },
      { $group: { _id: { month: '$month', type: '$type' }, total: { $sum: '$amount' } } },
      { $group: { _id: '$_id.month', totals: { $push: { type: '$_id.type', total: '$total' } } } },
      { $sort: { _id: 1 } }
    ];

    const result = await Transaction.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
