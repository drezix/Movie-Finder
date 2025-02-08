const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// POST /auth/register
router.post('/register', authController.register);

module.exports = router;