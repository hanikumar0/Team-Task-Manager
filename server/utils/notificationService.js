const Notification = require('../models/Notification');
const Project = require('../models/Project');

/**
 * Utility to create and send notifications to project members
 * @param {string} senderId - ID of user who performed action
 * @param {string} projectId - ID of the project
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {string} type - assignment | update | comment | alert
 * @param {string} link - Optional redirect link
 * @param {Array} excludeIds - Optional array of user IDs to NOT notify
 */
const notifyProjectMembers = async ({ 
    senderId, 
    projectId, 
    title, 
    message, 
    type = 'update', 
    link = '',
    excludeIds = []
}) => {
    try {
        const project = await Project.findById(projectId).populate('owner members');
        if (!project) {
            console.error('Notification Error: Project not found', projectId);
            return;
        }

        const senderIdStr = senderId.toString();

        // Collect all unique members (owner + members)
        const recipients = [
            project.owner._id.toString(),
            ...(project.members || []).map(m => m?._id?.toString() || m?.toString())
        ].filter(id => id && id !== senderIdStr && !excludeIds.includes(id));

        // Remove duplicates
        const uniqueRecipients = [...new Set(recipients)];
        console.log(`Sending notifications to ${uniqueRecipients.length} recipients for project ${project.name}`);

        // Create notification objects
        const notifications = uniqueRecipients.map(recipientId => ({
            recipient: recipientId,
            sender: senderId,
            title,
            message,
            type,
            link
        }));

        if (notifications.length > 0) {
            await Notification.insertMany(notifications);
        }
    } catch (error) {
        console.error('Notification Error:', error);
    }
};

/**
 * Notify a specific user directly
 */
const notifyUser = async ({ recipientId, senderId, title, message, type = 'update', link = '' }) => {
    try {
        if (recipientId.toString() === senderId.toString()) return;
        
        await Notification.create({
            recipient: recipientId,
            sender: senderId,
            title,
            message,
            type,
            link
        });
    } catch (error) {
        console.error('Direct Notification Error:', error);
    }
};

module.exports = { notifyProjectMembers, notifyUser };
