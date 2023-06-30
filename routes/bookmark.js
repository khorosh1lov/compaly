const express = require('express');
const { getAllBookmarks, createBookmark, deleteBookmark } = require('../controllers/bookmarkController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAllBookmarks);

router.post('/', auth, createBookmark);

router.delete('/:id/delete', auth, deleteBookmark);

module.exports = router;