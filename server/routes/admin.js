// const express = require('express');
// const Package = require('../models/Package');

// const router = express.Router();

// // Add package
// router.post('/packages', async (req, res) => {
//     try {
//         const newPackage = new Package(req.body);
//         await newPackage.save();
//         res.status(201).json(newPackage);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // Update package
// router.put('/packages/:id', async (req, res) => {
//     try {
//         const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.status(200).json(updatedPackage);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // Delete package
// router.delete('/packages/:id', async (req, res) => {
//     try {
//         await Package.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: 'Package deleted' });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// module.exports = router;
const express = require('express');
const Package = require('../models/Package');

const router = express.Router();

// Fetch all packages
router.get('/packages', async (req, res) => {
    try {
        const packages = await Package.find(); // Fetching all packages from the database
        res.status(200).json(packages);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch packages', error: err });
    }
});

// Add a new package
router.post('/packages', async (req, res) => {
    try {
        const newPackage = new Package(req.body); // Creating a new package instance from the request body
        await newPackage.save(); // Saving the new package to the database
        res.status(201).json(newPackage); // Responding with the newly created package
    } catch (err) {
        res.status(500).json({ message: 'Failed to add package', error: err });
    }
});

// Update an existing package
router.put('/packages/:id', async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.status(200).json(updatedPackage); // Responding with the updated package
    } catch (err) {
        res.status(500).json({ message: 'Failed to update package', error: err });
    }
});

// Delete a package
router.delete('/packages/:id', async (req, res) => {
    try {
        const deletedPackage = await Package.findByIdAndDelete(req.params.id); // Deleting package by ID
        if (!deletedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.status(200).json({ message: 'Package deleted successfully' }); // Successful deletion message
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete package', error: err });
    }
});

module.exports = router;
