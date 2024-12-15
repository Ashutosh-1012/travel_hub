import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const Invoice = () => {
    const location = useLocation();
    const { id } = useParams();  // Get the invoice ID from the URL
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        if (!location.state) {
            // If location.state is null, fetch booking details using the ID
            axios.get(`https://travel-hub-a2m5.onrender.com/bookings/${id}`)
                .then(response => setBookingDetails(response.data))
                .catch(error => console.error('Error fetching booking details:', error));
        } else {
            setBookingDetails(location.state.bookingDetails);
        }
    }, [location.state, id]);

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(16);

        // Title of the invoice
        doc.text('Invoice', 20, 20);

        // Invoice details
        doc.setFontSize(12);
        doc.text(`Name: ${bookingDetails.name}`, 20, 40);
        doc.text(`Email: ${bookingDetails.email}`, 20, 50);
        doc.text(`Phone: ${bookingDetails.phone}`, 20, 60);
        doc.text(`Number of Travelers: ${bookingDetails.travelers}`, 20, 70);
        doc.text(`Special Requests: ${bookingDetails.specialRequests || 'None'}`, 20, 80);
        doc.text(`Package ID: ${bookingDetails.package}`, 20, 90);

        // Download PDF
        doc.save('invoice.pdf');
    };

    if (!bookingDetails) {
        return <div className="text-gray-500 text-xl text-center">Loading invoice...</div>;  // Show loading if bookingDetails is not yet available
    }

    return (
        <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg max-w-4xl mt-8">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Invoice</h1>

            {/* Invoice content */}
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

            {/* Download Button */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={generatePDF}
                    className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105"
                >
                    <i className="fas fa-download mr-2"></i> Download Invoice
                </button>
            </div>
        </div>
    );
};

export default Invoice;
