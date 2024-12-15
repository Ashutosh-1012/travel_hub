import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PackageDetails = () => {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/packages/${id}`)
            .then((res) => setPkg(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!pkg)
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-gray-500 text-xl">Loading...</p>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-80 object-cover"
                    />
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{pkg.title}</h1>
                        <p className="text-gray-700 text-base mb-4">{pkg.description}</p>
                        <p className="text-xl font-semibold text-blue-600 mb-4">
                            Price: ${pkg.price}
                        </p>
                        <p className="text-gray-600 mb-6">
                            <span className="font-medium">Available Dates:</span>{' '}
                            {pkg.availableDates.join(', ')}
                        </p>
                        <div className="text-center">
                            <Link
                                to={`/book/${pkg._id}`}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
