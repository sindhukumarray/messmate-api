const express = require("express"); //express import

const router = express.Router();// ye serf /messes ke routes handal karega 

const Mess = require("../models/Mess"); // mongodb model import


// GET all messes
router.get("/", async (req, res) => {

    try {

        const messes = await Mess.find();

        res.json(messes);

    } catch (err) {

        res.status(500).json({
            message: "Server error"
        });

    }

});

// POST create a mess
router.post("/", async (req, res) => {

    try {

        const { name, location, price } = req.body;

        const mess = new Mess({

            name,
            location,
            price

        });

        const saved = await mess.save();

        res.status(201).json(saved);

    } catch (err) {

        res.status(400).json({

            message: "Bad request or missing fields"

        });

    }

});

// GET single mess by ID
router.get("/:id", async (req, res) => {

    try {

        const mess = await Mess.findById(req.params.id);

        if (!mess) {

            return res.status(404).json({
                message: "Mess not found"
            });

        }

        res.json(mess);

    } catch (err) {

        res.status(500).json({
            message: "Invalid ID or server error"
        });

    }

});

module.exports = router; //routes ko export kar deya 