require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://team-task-manager-kappa.vercel.app',
    'http://localhost:3000'
].filter(Boolean).map(url => url.replace(/\/$/, ''));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const sanitizedOrigin = origin.replace(/\/$/, '');
        if (allowedOrigins.includes(sanitizedOrigin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/activity", require("./routes/activity"));

app.get("/", (req, res) => {
    res.json({ message: "Synergy API is active" });
});

/**
 * PHASE 3: SERVER BOOTSTRAP FIX
 * Ensures DB is connected BEFORE the server starts listening.
 */
async function startServer() {
    try {
        console.log("🚀 Starting Server Bootstrap...");
        await connectDB();

        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("❌ Startup failed", err);
        process.exit(1);
    }
}

// Initial execution
startServer();

// Export for Vercel
module.exports = app;
