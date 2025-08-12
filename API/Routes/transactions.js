const express = require('express');
const router = express.Router();
const controller = require('../Controllers/transactionsController');
const auth = require('../../middleware/auth');
const roleCheck = require('../../middleware/roleCheck');
const rateLimit = require('../../middleware/rateLimit');

// list & search (all authenticated)
router.get('/', auth.verifyToken, rateLimit.transactionLimiter, controller.listTransactions);
router.get('/meta/categories', auth.verifyToken, controller.getCategories);
router.get('/:id', auth.verifyToken, controller.getTransaction);

// create / update / delete (admin & user)
router.post('/', auth.verifyToken, roleCheck.allow(['admin','user']), controller.createTransaction);
router.put('/:id', auth.verifyToken, roleCheck.allow(['admin','user']), controller.updateTransaction);
router.delete('/:id', auth.verifyToken, roleCheck.allow(['admin','user']), controller.deleteTransaction);

module.exports = router;
