const Project = require('../models/Project');
const { logActivity } = require('./activityController');
const { notifyProjectMembers, notifyUser } = require('../utils/notificationService');

exports.getProjects = async (req, res) => {
    try {
        const query = req.user.role === 'Admin' ? {} : {
            $or: [
                { owner: req.user.id },
                { members: req.user.id }
            ]
        };
        const projects = await Project.find(query)
            .populate('owner', 'name email')
            .populate('members', 'name email')
            .lean();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('owner', 'name email avatar')
            .populate('members', 'name email avatar')
            .lean();
        
        if (!project) return res.status(404).json({ message: 'Project not found' });
        
        // Check access
        const isOwner = project.owner._id.toString() === req.user.id;
        const isMember = project.members.some(m => m._id.toString() === req.user.id);
        const isAdmin = req.user.role === 'Admin';

        if (!isOwner && !isMember && !isAdmin) {
            return res.status(401).json({ message: 'Not authorized to view this project' });
        }
        
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createProject = async (req, res) => {
    try {
        const { name, description, startDate, endDate, priority, members } = req.body;
        const project = await Project.create({
            name,
            description,
            startDate,
            endDate,
            priority,
            owner: req.user.id,
            members: members || []
        });

        // Log Activity
        await logActivity(req.user.id, 'Created Project', 'Project', project._id, `Created project: ${name}`);

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addMember = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const { userId } = req.body;
        if (!project.members.includes(userId)) {
            project.members.push(userId);
            await project.save();

            // Notifications
            await notifyUser({
                recipientId: userId,
                senderId: req.user.id,
                title: 'Added to Project',
                message: `You have been added to the project: ${project.name}`,
                type: 'assignment',
                link: `/projects/${project._id}`
            });

            await notifyProjectMembers({
                senderId: req.user.id,
                projectId: project._id,
                title: 'New Member Added',
                message: `A new member has joined the project: ${project.name}`,
                type: 'update',
                link: `/projects/${project._id}`,
                excludeIds: [userId] // Already notified directly
            });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
