const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    travelers: Number,
    specialRequests: String,
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
    },
    totalPrice: Number,
});

// Check if the model already exists in mongoose.models, if it does, use it, otherwise define a new one
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

module.exports = Booking;
