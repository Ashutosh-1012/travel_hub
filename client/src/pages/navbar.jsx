import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();  // Hook to navigate to different routes

    return (
        <nav className="bg-blue-600 p-4 sticky top-0 z-10 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-semibold">BookingApp</div>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                >
                    Home
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
