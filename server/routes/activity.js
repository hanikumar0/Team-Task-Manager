const express = require('express');
const router = express.Router();
const { getActivities } = require('../controllers/activityController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getActivities);

module.exports = router;
