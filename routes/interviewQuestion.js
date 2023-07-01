const express = require('express');
const { getOneQuestion, editQuestion, deleteQuestion } = require('../controllers/interviewQuestionController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/:id', getOneQuestion);

router.put('/:id', auth, editQuestion);

router.delete('/:id', auth, deleteQuestion);

module.exports = router;
