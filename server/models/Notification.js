const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['assignment', 'update', 'comment', 'alert'],
        default: 'alert'
    },
    link: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ read: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
