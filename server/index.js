const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Robust CORS Configuration
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://team-task-manager-kappa.vercel.app',
    'http://localhost:3000'
].filter(Boolean).map(url => url.replace(/\/$/, '')); // Remove trailing slashes

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        
        const sanitizedOrigin = origin.replace(/\/$/, '');
        if (allowedOrigins.includes(sanitizedOrigin)) {
            callback(null, true);
        } else {
            console.warn(`CORS blocked for origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

app.use(express.json());

// Database Connection Middleware
const ensureDbConnected = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await connectDB();
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Database connection failed" });
    }
};

app.use(ensureDbConnected);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/activity', require('./routes/activity'));

app.get('/', (req, res) => {
    res.json({ message: 'Synergy API is active and running.' });
});

// Database Connection
let connectionPromise = null;

const connectDB = async () => {
    // 1. If already connected, return immediately
    if (mongoose.connection.readyState === 1) return;

    // 2. If a connection is already in progress, wait for it
    if (connectionPromise) {
        return connectionPromise;
    }

    // 3. Otherwise, start a new connection and store the promise
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
        bufferCommands: false,
    });

    try {
        await connectionPromise;
        console.log('MongoDB Connected Successfully');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        connectionPromise = null; // Reset promise so we can retry on next request
        throw err;
    }
};

// Execute initial connection
connectDB();

// Handle 404
app.use((req, res) => {
    res.status(404).json({ message: 'API Route not found' });
});

// Export for Vercel
module.exports = app;

// Local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Local server running on port ${PORT}`);
    });
}
