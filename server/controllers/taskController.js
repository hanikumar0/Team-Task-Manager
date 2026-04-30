const Task = require('../models/Task');
const { logActivity } = require('./activityController');

exports.getTasks = async (req, res) => {
    try {
        const { projectId } = req.query;
        let query = {};
        
        if (projectId) {
            query.projectId = projectId;
        } else {
            query.$or = [
                { assignedTo: req.user.id },
                { createdBy: req.user.id }
            ];
        }

        const tasks = await Task.find(query)
            .populate('assignedTo', 'name email avatar')
            .populate('createdBy', 'name email');
        res.json(tasks);
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

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addComment = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        const comment = {
            user: req.user.id,
            text: req.body.text
        };

        task.comments.push(comment);
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
