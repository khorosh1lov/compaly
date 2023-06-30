const express = require('express');
const { registerUser, loginUser, editUser, deleteUser, getCurrentUser } = require('../controllers/userController.js');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', auth, editUser);
router.delete('/:id/delete', auth, deleteUser);
router.get('/me', auth, getCurrentUser);

module.exports = router;
