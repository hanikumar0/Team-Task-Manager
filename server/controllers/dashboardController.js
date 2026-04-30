const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.getDashboardStats = async (req, res) => {
    try {
        const isAdmin = req.user.role === 'Admin';
        
        // Base queries
        const projectQuery = isAdmin ? {} : { $or: [{ owner: req.user.id }, { members: req.user.id }] };
        const taskQuery = isAdmin ? {} : { assignedTo: new mongoose.Types.ObjectId(req.user.id) };
        const aggregateQuery = isAdmin ? {} : { assignedTo: new mongoose.Types.ObjectId(req.user.id) };
        
        // Parallel fetching for performance
        const [
            totalProjects,
            activeProjects,
            totalTasks,
            overdueTasks,
            taskStatusDist,
            totalMembers,
            recentTasks
        ] = await Promise.all([
            Project.countDocuments(projectQuery),
            Project.countDocuments({ ...projectQuery, status: 'Active' }),
            Task.countDocuments(taskQuery),
            Task.countDocuments({ 
                ...taskQuery, 
                dueDate: { $lt: new Date() },
                status: { $ne: 'Completed' }
            }),
            Task.aggregate([
                { $match: taskQuery },
                { $group: { _id: '$status', count: { $sum: 1 } } }
            ]),
            isAdmin ? User.countDocuments({}) : Promise.resolve(null),
            Task.find(taskQuery)
                .sort({ createdAt: -1 })
                .limit(5)
                .populate('projectId', 'name')
                .populate('assignedTo', 'name avatar')
        ]);

        // Format task distribution
        const statusDistribution = {
            'Todo': 0,
            'In Progress': 0,
            'Review': 0,
            'Completed': 0
        };
        taskStatusDist.forEach(item => {
            if (statusDistribution.hasOwnProperty(item._id)) {
                statusDistribution[item._id] = item.count;
            }
        });

        res.json({
            summary: {
                totalProjects,
                activeProjects,
                totalTasks,
                overdueTasks,
                totalMembers: isAdmin ? totalMembers : undefined,
                completionRate: totalTasks > 0 
                    ? Math.round((statusDistribution['Completed'] / totalTasks) * 100) 
                    : 0
            },
            statusDistribution,
            recentTasks,
            // Productivity trend (Currently empty until real history tracking is implemented)
            productivity: []
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
