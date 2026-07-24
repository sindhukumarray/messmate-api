// Load environment variables
require("dotenv").config();

// Import libraries
const express = require("express");
const mongoose = require("mongoose");

// Import routes
const messRoutes = require("./routes/messRoutes");

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/messes", messRoutes);

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok"
    });
});

// MongoDB Connection
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("Connected to MongoDB");

    app.listen(PORT, () => {

        console.log(`Server running at http://localhost:${PORT}`);

    });

})

.catch((err) => {

    console.error("Failed to connect to MongoDB:", err.message);

});

// Handle Unknown Routes
app.use((req, res) => {

    res.status(404).json({

        message: "Route not found"

    });

});