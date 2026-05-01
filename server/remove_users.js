const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const User = require('./models/User');

async function removeTestUsers() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const emailsToRemove = [
            'hanikumar064@gmail.com',
            'admin@test.com',
            'member@test.com'
        ];

        const result = await User.deleteMany({ 
            email: { $in: emailsToRemove.map(e => e.toLowerCase()) } 
        });

        console.log(`✅ Successfully removed ${result.deletedCount} test users.`);
        
        process.exit(0);
    } catch (err) {
        console.error('Error removing users:', err);
        process.exit(1);
    }
}

removeTestUsers();
