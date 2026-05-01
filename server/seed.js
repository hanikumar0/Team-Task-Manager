const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const User = require('./models/User');

async function seedUsers() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing users to start fresh (optional, but good for debugging)
        // await User.deleteMany({});
        // console.log('Cleared existing users');

        const users = [
            {
                name: 'Admin User',
                email: 'hanikumar064@gmail.com',
                password: 'Password@123',
                role: 'Admin'
            },
            {
                name: 'Test Admin',
                email: 'admin@test.com',
                password: 'Admin@123',
                role: 'Admin'
            },
            {
                name: 'Test Member',
                email: 'member@test.com',
                password: 'Member@123',
                role: 'Member'
            }
        ];

        for (const userData of users) {
            const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
            if (!existingUser) {
                await User.create(userData);
                console.log(`✅ Created user: ${userData.email}`);
            } else {
                console.log(`ℹ️ User already exists: ${userData.email}`);
            }
        }

        console.log('\nSeeding complete! You can now log in with:');
        console.log('Email: hanikumar064@gmail.com | Password: Password@123');
        console.log('Email: admin@test.com | Password: Admin@123');
        console.log('Email: member@test.com | Password: Member@123');

        process.exit(0);
    } catch (err) {
        console.error('Error seeding users:', err);
        process.exit(1);
    }
}

seedUsers();
