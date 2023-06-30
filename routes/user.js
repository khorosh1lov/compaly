const express = require('express');
const { registerUser, loginUser, editUser, getCurrentUser } = require('../controllers/userController.js');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', editUser);
router.get('/me', auth, getCurrentUser);

module.exports = router;
