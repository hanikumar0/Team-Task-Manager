const mongoose = require('mongoose');

let isConnected = false;
let connectionPromise = null;

/**
 * Singleton database connection pattern.
 * Ensures only one connection is active and reuse it.
 */
async function connectDB() {
    // If already connected, return
    if (isConnected && mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    // If a connection is in progress, wait for it
    if (connectionPromise) {
        return await connectionPromise;
    }

    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
        console.error("❌ MONGODB_URI is not defined");
        process.exit(1);
    }

    console.log("⏳ Connecting to MongoDB...");

    // We remove bufferCommands: false to allow Mongoose to handle 
    // internal buffering if the connection is slightly delayed,
    // OR we ensure we await it fully. 
    // The user requested this architecture:
    connectionPromise = mongoose.connect(mongoURI, {
        serverSelectionTimeoutMS: 5000,
        // Using the requested pattern
    });

    try {
        const conn = await connectionPromise;
        isConnected = true;
        console.log("✅ MongoDB Connected");
        return conn;
    } catch (err) {
        console.error("❌ MongoDB Failed:", err.message);
        connectionPromise = null; // Allow retry
        throw err;
    }
}

module.exports = connectDB;
