const express = require('express');
const Package = require('../models/Package');
const Booking = require('../models/booking');

const router = express.Router();

// Get all packages
router.get('/packages', async (req, res) => {
    try {
        const packages = await Package.find();
        res.status(200).json(packages);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get package by ID
router.get('/packages/:id', async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        res.status(200).json(package);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Book a package
router.post('/bookings', async (req, res) => {
    try {
        const bookingData = req.body;
        const package = await Package.findById(bookingData.package);
        const totalPrice = package.price * bookingData.travelers;
        const booking = new Booking({ ...bookingData, totalPrice });
        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;