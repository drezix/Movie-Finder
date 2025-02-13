const requireAuth= require('../middlewares/authMiddleware');
const express = require('express');
const movieController = require('../controllers/movieController');
const router = express.Router();

router.use(requireAuth);

// POST /movies
router.post('/insert', movieController.insert);
router.get('/allmovies', movieController.getAll);
router.delete('/:id', movieController.remove);

module.exports = router;