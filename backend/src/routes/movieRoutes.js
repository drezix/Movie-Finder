const express = require('express');
const movieController = require('../controllers/movieController');
const router = express.Router();

// POST /movies
router.post('/insert', movieController.insert);

module.exports = router;