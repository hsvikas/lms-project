const express = require('express');
const { markWatched, getUserProgress } = require('../controllers/progress.controller');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:videoId', authenticate, markWatched);
router.get('/:userId', authenticate, getUserProgress);

module.exports = router;