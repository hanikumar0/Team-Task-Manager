const Task = require('../models/Task');
const { logActivity } = require('./activityController');
const { notifyProjectMembers, notifyUser } = require('../utils/notificationService');

exports.getTasks = async (req, res) => {
    try {
        const { projectId } = req.query;
        let query = {};
        
        if (projectId) {
            query.projectId = projectId;
        } else if (req.user.role !== 'Admin') {
            query.$or = [
                { assignedTo: req.user.id },
                { createdBy: req.user.id }
            ];
        }

        const tasks = await Task.find(query)
            .populate('projectId', 'name')
            .populate('assignedTo', 'name email avatar')
            .sort({ createdAt: -1 })
            .lean();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('projectId', 'name')
            .populate('assignedTo', 'name email avatar')
            .populate('comments.user', 'name avatar')
            .lean();
            
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            createdBy: req.user.id
        });

        // Log Activity
        await logActivity(req.user.id, 'Created Task', 'Task', task._id, `Created task: ${task.title}`);

        // Notifications
        await notifyProjectMembers({
            senderId: req.user.id,
            projectId: task.projectId,
            title: 'New Task Created',
            message: `A new task "${task.title}" has been added to the project.`,
            type: 'assignment',
            link: `/tasks`
        });

        if (task.assignedTo) {
            await notifyUser({
                recipientId: task.assignedTo,
                senderId: req.user.id,
                title: 'New Task Assigned',
                message: `You have been assigned to: ${task.title}`,
                type: 'assignment',
                link: `/tasks`
            });
        }

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        const oldStatus = task.status;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Log Activity if status changed
        if (req.body.status && req.body.status !== oldStatus) {
            await logActivity(req.user.id, 'Updated Task Status', 'Task', task._id, `Changed status of "${task.title}" to ${req.body.status}`);
            
            // Notify members of status change
            await notifyProjectMembers({
                senderId: req.user.id,
                projectId: task.projectId,
                title: 'Task Status Updated',
                message: `Task "${task.title}" is now ${req.body.status}`,
                type: 'update',
                link: `/tasks`
            });
        } else {
            await logActivity(req.user.id, 'Updated Task', 'Task', task._id, `Updated task: ${task.title}`);
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await Task.findByIdAndDelete(req.params.id);
        
        // Log Activity
        await logActivity(req.user.id, 'Deleted Task', 'Task', req.params.id, `Deleted task: ${task.title}`);
        
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
