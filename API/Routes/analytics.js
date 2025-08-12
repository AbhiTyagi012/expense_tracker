const express = require('express');
const router = express.Router();
const controller = require('../Controllers/analyticsController');
const auth = require('../../middleware/auth');
const rateLimit = require('../../middleware/rateLimit');

router.get('/monthly', auth.verifyToken, rateLimit.analyticsLimiter, controller.getMonthlyOverview);
router.get('/yearly', auth.verifyToken, rateLimit.analyticsLimiter, controller.getYearlyOverview);
router.get('/category-distribution', auth.verifyToken, rateLimit.analyticsLimiter, controller.getCategoryDistribution);
router.get('/income-vs-expense', auth.verifyToken, rateLimit.analyticsLimiter, controller.getIncomeVsExpense);

module.exports = router;
