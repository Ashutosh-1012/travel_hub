import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        travelers: 1,
        specialRequests: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        if (!formData.name || !formData.email || !formData.phone || formData.travelers < 1) {
            setError('Please fill in all required fields with valid data.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/bookings', {
                ...formData,
                package: id,
            });

            if (response.status === 201) {
                setSuccess(true);
                const bookingDetails = response.data;  // Assuming the response has booking details
                setTimeout(() => {
                    // Redirect to the booking confirmation page with booking details
                    navigate('/booking-confirmation', { state: { bookingDetails } });
                }, 2000); // Redirect after 2 seconds to show the success message
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while submitting your booking. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">

            {/* Form Container */}
            <div className="flex flex-1 justify-center items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md bg-white p-8 shadow-xl rounded-lg">
                    <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Book Your Package</h1>

                    {/* Error message */}
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    {/* Success message */}
                    {success && <p className="text-green-500 text-center mb-4">Booking successful! Redirecting to confirmation...</p>}

                    {/* Booking form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700">Number of Travelers</label>
                            <input
                                type="number"
                                name="travelers"
                                value={formData.travelers}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                min="1"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700">Special Requests</label>
                            <textarea
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                        >
                            Submit Booking
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
