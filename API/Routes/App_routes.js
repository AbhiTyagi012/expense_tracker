const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const usersRoutes = require('./users');
const transactionsRoutes = require('./transactions');
const analyticsRoutes = require('./analytics');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/transactions', transactionsRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;
