const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask, addComment } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getTasks)
    .post(protect, createTask);

router.route('/:id')
    .put(protect, updateTask)
    .delete(protect, deleteTask);

router.post('/:id/comments', protect, addComment);

module.exports = router;
