const express = require('express');
const router = express.Router();
const controller = require('../Controllers/authController');
const rateLimit = require('../../middleware/rateLimit');

router.post('/register', rateLimit.authLimiter, controller.register);
router.post('/login', rateLimit.authLimiter, controller.login);

module.exports = router;
