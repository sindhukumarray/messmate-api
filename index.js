// //.env ko load kro 
require("dotenv").config();

// Import Express framework
const express = require("express");

//import mongo library 
const mongoose = require("mongoose");

//onliye for cheking then delete import
const Mess = require("./models/Mess");

// conect messall routes
const messRoutes = require("./routes/messRoutes");

// Create an Express application
const app = express();

//# Middleware to parse JSON request body
app.use(express.json());
app.use("/messes", messRoutes);

// Define the port number
const PORT = process.env.PORT || 3000;

// //testing perpouse
app.get("/test-add", async (req, res) => {

    try {

        const newMess = new Mess({

            name: "Test Mess",
            location: "Baner",
            price: 3200

        });

        const saved = await newMess.save();

        console.log(saved);

        res.json(saved);

    } catch (err) {

        console.error(err);

        res.status(500).json(err);

    }

});

// mongoosedb connection
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



// Sample Mess Data
let messes = [
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

// Get Messes By Location
app.get("/messes/location/:loc", (req, res) => {

    const location = req.params.loc;

    const filteredMesses = messes.filter(
        (m) => m.location.toLowerCase() === location.toLowerCase()
    );

    if (filteredMesses.length === 0) {

        return res.status(404).json({
            message: "No messes found"
        });

    }

    res.json(filteredMesses);

});

// Create New Mess
app.post("/messes", (req, res) => {

    // Get data from request body
    const { name, location, price } = req.body;

   // Validate required fields
if (!name || !location || price === undefined) {

    return res.status(400).json({
        message: "Missing required fields"
    });

}

// Validate price
if (typeof price !== "number") {

    return res.status(400).json({
        message: "Price must be a number"
    });

}

    // Create new mess object
    const newMess = {
        id: messes.length + 1,
        name,
        location,
        price
    };

    // Add new mess to array
    messes.push(newMess);

    // Send response
    res.status(201).json(newMess);

});

// Update Existing Mess
app.put("/messes/:id", (req, res) => {

    // Get mess ID from URL
    const messId = parseInt(req.params.id);

    // Find mess by ID
    const mess = messes.find((m) => m.id === messId);

    // Check if mess exists
    if (!mess) {

        return res.status(404).json({
            message: "Mess not found"
        });

    }

    // Get updated data from request body
    const { name, location, price } = req.body;

    // Update only provided fields
    if (name) mess.name = name;

    if (location) mess.location = location;

    if (price) mess.price = price;

    // Send success response
    res.json({
        message: "Mess updated successfully",
        mess
    });

});

// Delete Existing Mess
app.delete("/messes/:id", (req, res) => {

    // Get mess ID from URL
    const messId = parseInt(req.params.id);

    // Find index of mess
    const index = messes.findIndex((m) => m.id === messId);

    // Check if mess exists
    if (index === -1) {

        return res.status(404).json({
            message: "Mess not found"
        });

    }

    // Delete mess from array
    const deleted = messes.splice(index, 1);

    // Send response
    res.json({
        message: "Mess deleted successfully",
        deleted
    });

});

// Handle Unknown Routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});
// Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
// });