import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingDetails } = location.state || {};  // Get booking details from location state
//    if booking data is  not found then show loading only 
    if (!bookingDetails) {
        return <div className="text-gray-500 text-xl text-center">Loading...</div>;  // Show loading if bookingDetails are not available
    }

    return (
        <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg max-w-3xl mt-8">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Booking Confirmation</h1>

            {/* Display booking details */}
            <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Booking Details</h2>
                    <p className="text-gray-600"><strong className="font-medium">Name:</strong> {bookingDetails.name}</p>
                    <p className="text-gray-600"><strong className="font-medium">Email:</strong> {bookingDetails.email}</p>
                    <p className="text-gray-600"><strong className="font-medium">Phone:</strong> {bookingDetails.phone}</p>
                    <p className="text-gray-600"><strong className="font-medium">Number of Travelers:</strong> {bookingDetails.travelers}</p>
                    <p className="text-gray-600"><strong className="font-medium">Special Requests:</strong> {bookingDetails.specialRequests || 'None'}</p>
                    <p className="text-gray-600"><strong className="font-medium">Package ID:</strong> {bookingDetails.package}</p>
                </div>
            </div>

            {/* Button to navigate to the invoice page */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => navigate(`/invoice/${bookingDetails._id}`, { state: { bookingDetails } })}
                    className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105"
                >
                    View Invoice
                </button>
            </div>
        </div>
    );
};

export default BookingConfirmation;
