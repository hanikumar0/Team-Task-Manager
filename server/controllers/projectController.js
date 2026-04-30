const Project = require('../models/Project');
const { logActivity } = require('./activityController');

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            $or: [
                { owner: req.user.id },
                { members: req.user.id }
            ]
        }).populate('owner', 'name email').populate('members', 'name email');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('owner', 'name email')
            .populate('members', 'name email');
        
        if (!project) return res.status(404).json({ message: 'Project not found' });
        
        // Check access
        if (project.owner.toString() !== req.user.id && !project.members.includes(req.user.id)) {
            return res.status(401).json({ message: 'Not authorized' });
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
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
