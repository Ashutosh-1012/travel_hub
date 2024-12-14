// backend/routes/user.js
const express = require('express');
const Package = require('../models/Package');
const Booking = require('../models/Booking');

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
