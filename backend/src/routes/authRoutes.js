const express = require('express');
const authController = require('../controllers/authController');
const { checkLoginAttempts, incrementLoginAttempts } = require('../middlewares/loginAttemptMiddleware');
const router = express.Router();

// POST /auth/register
router.post('/register', authController.register);
router.post('/login', checkLoginAttempts, incrementLoginAttempts, authController.login);
router.post('/logout', authController.logout);

module.exports = router;