const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    availableDates: [String],
    image: String,
});

// Check if the model already exists in mongoose.models, if it does, use it, otherwise define a new one
const Package = mongoose.models.Package || mongoose.model('Package', packageSchema);

module.exports = Package;
