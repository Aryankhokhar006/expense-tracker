const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config();

const app = express();


// -------------------------
// Middleware
// -------------------------

app.use(cors());

app.use(express.json());


// -------------------------
// Test Route
// -------------------------

app.get("/", (req, res) => {
    res.json({
        message: "Expense Tracker API is running"
    });
});


// -------------------------
// Health Check
// -------------------------

app.get("/api/health", (req, res) => {

    res.status(200).json({
        status: "OK",
        service: "Expense Tracker Backend"
    });

});


// -------------------------
// API Routes
// -------------------------

app.use("/api/auth", authRoutes);

app.use("/api/expenses", expenseRoutes);


// -------------------------
// 404 Handler
// -------------------------

app.use((req, res) => {

    res.status(404).json({
        message: `Route ${req.originalUrl} not found`
    });

});


// -------------------------
// Error Handler
// -------------------------

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({
        message: "Internal Server Error"
    });

});


// -------------------------
// Start Server
// -------------------------

const PORT = process.env.PORT || 3000;

const startServer = async () => {

    try {

        await connectDB();

        app.listen(PORT, () => {

            console.log(
                `Server running on http://localhost:${PORT}`
            );

            console.log(
                `Health API: http://localhost:${PORT}/api/health`
            );

        });

    } catch (error) {

        console.error(
            "Failed to start server:",
            error.message
        );

        process.exit(1);

    }

};

startServer();