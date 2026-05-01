const express = require('express');
const router = express.Router();
const { getProjects, getProjectById, createProject, updateProject, deleteProject, addMember } = require('../controllers/projectController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getProjects)
    .post(protect, admin, createProject);

router.route('/:id')
    .get(protect, getProjectById)
    .put(protect, admin, updateProject)
    .delete(protect, admin, deleteProject);

router.post('/:id/add-member', protect, admin, addMember);


module.exports = router;
