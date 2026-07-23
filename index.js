// Import Express framework
const express = require("express");

// Create an Express application
const app = express();

// Define the port number
const PORT = process.env.PORT || 3000;

// Root Route
app.get("/", (req, res) => {
    res.send("Welcome to MessMate API - powered by Express!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});