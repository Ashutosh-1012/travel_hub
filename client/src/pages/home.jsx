import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/packages')
            .then((res) => setPackages(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                    Available Packages
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div
                            key={pkg._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={pkg.image}
                                alt={pkg.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                    {pkg.title}
                                </h2>
                                <p className="text-gray-600 text-sm mb-4">
                                    {pkg.description.substring(0, 80)}...
                                </p>
                                <p className="text-lg font-bold text-blue-600 mb-4">
                                    Price: ${pkg.price}
                                </p>
                                <Link
                                    to={`/packages/${pkg._id}`}
                                    className="block bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
