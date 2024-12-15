const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sirhello033:mmu7qb5889gy0zKJ@cluster0.kld0d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// Models
const Package = require('./models/Package');
const Booking = require('./models/booking');

// Routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/bookingRoutes.js');


app.use('/admin', adminRoutes);
app.use('/', userRoutes);
app.use('/bookings', bookingRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
