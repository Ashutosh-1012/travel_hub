import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import PackageDetails from './pages/PackageDetails';
import BookingForm from './pages/BookingFrom';
import AdminPanel from './pages/adminpannel';
import BookingConfirmation from './components/BookingConfirmation';
import Invoice from './components/Invoice';
import './App.css';
import Navbar from './pages/navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/packages/:id" element={<PackageDetails />} />
                <Route path="/book/:id" element={<BookingForm />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                <Route path="/invoice/:id" element={<Invoice />} />
            </Routes>
        </Router>
    );
}

export default App;
