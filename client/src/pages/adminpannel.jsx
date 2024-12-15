import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [packages, setPackages] = useState([]);
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        availableDates: '',
        image: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // Fetch all packages from the backend
    const fetchPackages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/packages');
            setPackages(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Initial load of packages
    useEffect(() => {
        fetchPackages();
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Handle form submission for both adding and updating packages
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/admin/packages/${editId}`, form);
                setIsEditing(false);
                setEditId(null);
            } else {
                await axios.post('http://localhost:5000/admin/packages', form);
            }
            fetchPackages(); // Refresh the package list
            setForm({ title: '', description: '', price: '', availableDates: '', image: '' });
        } catch (err) {
            console.error(err);
        }
    };

    // Set form for editing an existing package
    const handleEdit = (pkg) => {
        setForm({
            title: pkg.title,
            description: pkg.description,
            price: pkg.price,
            availableDates: pkg.availableDates.join(', '),
            image: pkg.image,
        });
        setIsEditing(true);
        setEditId(pkg._id);
    };

    // Handle package deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/admin/packages/${id}`);
            fetchPackages(); // Refresh the package list
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-3xl font-bold">Admin Panel</h1>
                    <p className="text-sm mt-1">Manage your packages efficiently</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto py-8">
                {/* Add/Edit Package Form */}
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        {isEditing ? 'Edit Package' : 'Add Package'}
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">
                                Available Dates (comma-separated)
                            </label>
                            <input
                                type="text"
                                name="availableDates"
                                value={form.availableDates}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-bold mb-2">Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                className={`px-6 py-2 rounded-lg font-semibold text-white ${
                                    isEditing ? 'bg-yellow-500' : 'bg-blue-600'
                                }`}
                            >
                                {isEditing ? 'Update Package' : 'Add Package'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Display Existing Packages */}
                <h2 className="text-xl font-bold mb-6">Existing Packages</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div key={pkg._id} className="bg-white shadow rounded-lg p-4">
                            <img
                                src={pkg.image}
                                alt={pkg.title}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-lg font-bold">{pkg.title}</h3>
                            <p className="text-gray-600 mt-2">{pkg.description}</p>
                            <p className="mt-2 font-bold">Price: ${pkg.price}</p>
                            <p className="mt-1 text-gray-500 text-sm">
                                Available Dates: {pkg.availableDates.join(', ')}
                            </p>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => handleEdit(pkg)}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(pkg._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
