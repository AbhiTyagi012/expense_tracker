const express = require('express');
const router = express.Router();
const controller = require('../Controllers/usersController');
const auth = require('../../middleware/auth');
const roleCheck = require('../../middleware/roleCheck');

router.get('/', auth.verifyToken, roleCheck.allow(['admin']), controller.listUsers);
router.get('/me', auth.verifyToken, controller.me);
router.put('/:id/role', auth.verifyToken, roleCheck.allow(['admin']), controller.updateRole);

module.exports = router;
