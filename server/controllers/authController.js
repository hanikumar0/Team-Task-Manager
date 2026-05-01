const User = require('../models/User');
const jwt = require('jsonwebtoken');
const connectDB = require('../config/db');
const bcrypt = require('bcryptjs');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

/**
 * PHASE 6: LOGIN ROUTE REWRITE
 */
exports.login = async (req, res) => {
    try {
        await connectDB();
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        // Phase 3: Case-insensitive and trim
        email = email.trim().toLowerCase();

        console.log(`Login attempt for: ${email}`);

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User not found: ${email}`);
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Phase 4: bcrypt compare
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            console.log(`Password mismatch for: ${email}`);
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user._id, user.role);

        console.log(`✅ Login successful: ${email}`);

        return res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error('Login Error:', err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

exports.register = async (req, res) => {
    try {
        await connectDB();
        let { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        email = email.trim().toLowerCase();

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // User model pre-save hook will handle hashing
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        if (user) {
            const token = generateToken(user._id, user.role);
            return res.status(201).json({
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        }
    } catch (err) {
        console.error('Register Error:', err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

exports.getMe = async (req, res) => {
    try {
        await connectDB();
        const user = await User.findById(req.user.id).select('-password');
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        await connectDB();
        const users = await User.find({ _id: { $ne: req.user.id } }).select('-password');
        return res.json(users);
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await connectDB();
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.role === 'Admin') {
            return res.status(403).json({ success: false, message: 'Cannot delete an administrator' });
        }

        await user.deleteOne();
        return res.json({ success: true, message: 'User removed successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
