const User = require('../../models/User');

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').limit(100);
    res.json({ total: users.length, users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!['admin','user','read-only'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    res.json({ message: 'Role updated', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
