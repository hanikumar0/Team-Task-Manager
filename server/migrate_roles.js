const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const User = require('./models/User');

async function migrateRoles() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const admins = await User.updateMany(
            { role: { $in: ['Admin', 'admin'] } },
            { $set: { role: 'admin' } }
        );
        console.log(`✅ Updated ${admins.modifiedCount} admins to lowercase.`);

        const members = await User.updateMany(
            { role: { $in: ['Member', 'member'] } },
            { $set: { role: 'member' } }
        );
        console.log(`✅ Updated ${members.modifiedCount} members to lowercase.`);

        process.exit(0);
    } catch (err) {
        console.error('Error migrating roles:', err);
        process.exit(1);
    }
}

migrateRoles();
