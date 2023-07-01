const express = require('express');
const { editReview, getOneReview, deleteReview } = require('../controllers/reviewController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/:id', getOneReview);

router.put('/:id', auth, editReview);

router.delete('/:id', auth, deleteReview);

module.exports = router;
