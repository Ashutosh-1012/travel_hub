const express = require('express');
const Package = require('../models/Package');

const router = express.Router();

// Add package
router.post('/packages', async (req, res) => {
    try {
        const newPackage = new Package(req.body);
        await newPackage.save();
        res.status(201).json(newPackage);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update package
router.put('/packages/:id', async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPackage);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete package
router.delete('/packages/:id', async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Package deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;