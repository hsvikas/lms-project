const express = require('express');

const { getSubjects, getSubjectById } = require('../controllers/subject.controller');
const router = express.Router();

router.get('/', getSubjects);
router.get('/:id', getSubjectById);

module.exports = router;