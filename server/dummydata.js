//this is only for hardcoded pushing data to database or backend
const mongoose = require('mongoose');
const Package = require('./models/Package');

mongoose.connect('mongodb+srv://sirhello033:mmu7qb5889gy0zKJ@cluster0.kld0d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    return Package.insertMany([
        {
            title: 'Beach Paradise',
            description: 'Relax on sunny beaches and enjoy crystal clear waters.',
            price: 500,
            availableDates: ['2024-01-15', '2024-02-10', '2024-03-20'],
            image: 'https://images.mnstatic.com/9b/71/9b71c5d90c9f2d8480379333194a9db7.jpg?',
        },
        {
            title: 'Mountain Adventure',
            description: 'Explore the majestic mountains and scenic trails.',
            price: 750,
            availableDates: ['2024-04-05', '2024-05-15', '2024-06-10'],
            image: 'https://via.placeholder.com/150/8A2BE2/FFFFFF',
        },
        {
            title: 'City Escapade',
            description: 'Discover the best city attractions and nightlife.',
            price: 300,
            availableDates: ['2024-07-01', '2024-08-20', '2024-09-10'],
            image: 'https://via.placeholder.com/150/5F9EA0/FFFFFF',
        },
    ]);
}).then(() => {
    console.log('Dummy data inserted');
    mongoose.disconnect();
}).catch(err => {
    console.error(err);
});
