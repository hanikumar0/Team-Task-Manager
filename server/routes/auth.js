const express = require('express');
const router = express.Router();
const { register, login, getMe, getUsers, deleteUser } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/users', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
