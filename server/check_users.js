const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const User = require('./models/User');

async function checkUsers() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const users = await User.find({});
        console.log('Total users found:', users.length);
        
        users.forEach(u => {
            console.log(`- Name: ${u.name}, Email: ${u.email}, Role: ${u.role}`);
        });

        const targetEmail = 'hanikumar064@gmail.com';
        const user = await User.findOne({ email: targetEmail.toLowerCase() });
        
        if (user) {
            console.log(`\n✅ Found target user: ${user.email}`);
        } else {
            console.log(`\n❌ User ${targetEmail} NOT found.`);
        }

        process.exit(0);
    } catch (err) {
        console.error('Error checking users:', err);
        process.exit(1);
    }
}

checkUsers();
