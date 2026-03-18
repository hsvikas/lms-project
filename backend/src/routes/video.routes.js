const express = require('express');
const { getVideoById } = require('../controllers/video.controller');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:id', authenticate, getVideoById);

module.exports = router;