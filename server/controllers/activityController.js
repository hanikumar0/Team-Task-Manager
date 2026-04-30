const Activity = require('../models/Activity');

exports.getActivities = async (req, res) => {
    try {
        const activities = await Activity.find({})
            .sort({ createdAt: -1 })
            .limit(100)
            .populate('user', 'name avatar role');
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Helper function to log activity (can be called from other controllers)
exports.logActivity = async (userId, action, targetType, targetId, details) => {
    try {
        await Activity.create({
            user: userId,
            action,
            targetType,
            targetId,
            details
        });
    } catch (error) {
        console.error('Failed to log activity:', error);
    }
};
