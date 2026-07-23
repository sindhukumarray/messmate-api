// Import Express framework
const express = require("express");

// Create an Express application
const app = express();

// Define the port number
const PORT = process.env.PORT || 3000;

// Sample Mess Data
const messes = [
    {
        id: 1,
        name: "Sai Krupa Mess",
        location: "Wakad"
    },
    {
        id: 2,
        name: "Annapurna Veg",
        location: "Akurdi"
    },
    {
        id: 3,
        name: "HealthyBites",
        location: "Hinjewadi"
    }
];

// Root Route
app.get("/", (req, res) => {
    res.send("Welcome to MessMate API - powered by Express!");
});

// GET All Messes
app.get("/messes", (req, res) => {
    res.json(messes);
});

// GET Mess By ID
app.get("/messes/:id", (req, res) => {

    const messId = parseInt(req.params.id);

    const mess = messes.find((m) => m.id === messId);

    if (mess) {

        res.json(mess);

    } else {

        res.status(404).json({
            message: "Mess not found"
        });

    }

});

// Health Check Route
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok"
    });
});

// Mock Create Mess Route
app.post("/messes", (req, res) => {
    res.status(201).json({
        message: "Mess created (mock)"
    });
});

// Handle Unknown Routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});