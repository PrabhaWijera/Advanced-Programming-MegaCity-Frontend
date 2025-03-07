import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingAdding() {
    const [user, setUser] = useState(null);
    const [cars, setCars] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedCar, setSelectedCar] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [status, setStatus] = useState('completed');
    const [fromPlace, setFromPlace] = useState('');
    const [toPlace, setToPlace] = useState('');
    const [driverName, setDriverName] = useState('');

    // Fetch user data and car data
    useEffect(() => {
        // Fetch user data from the profile endpoint (you can get userId here)
        const fetchUser = async () => {
            const token = localStorage.getItem("token"); // Assume JWT token is stored in localStorage
            const response = await axios.get('http://localhost:8080/MegaCity_war_exploded/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
        };

        // Fetch car data for dropdown
        const fetchCars = async () => {
            const response = await axios.get('http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage');
            setCars(response.data);
        };

        // Fetch users data from API and set a random driver
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/MegaCity_war_exploded/users');
                const users = response.data;

                // Filter the users to get only those with the role of 'driver'
                const drivers = users.filter(user => user.role === 'driver');

                // Randomly select a driver from the list
                if (drivers.length > 0) {
                    const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
                    setDriverName(randomDriver.username); // Set the random driver's username as the driver name
                }
            } catch (error) {
                console.error("Error fetching users data:", error);
            }
        };

        fetchUser();
        fetchCars();
        fetchUsers();  // Fetch and set driver when the component mounts
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            userId: user.id, // Use user id from the profile response
            carId: selectedCar,
            startDate,
            endDate,
            totalAmount,
            status,
            fromPlace,
            toPlace,
            driverName
        };

        try {
            const response = await axios.post('http://localhost:8080/MegaCity_war_exploded/booking', bookingData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert(response.data); // Response from the backend (e.g., booking success message)
        } catch (error) {
            console.error('Error creating booking', error);
            alert('Error creating booking');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Book a Car</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label">User ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userId"
                        value={user ? user.id : ''}
                        disabled
                    />
                </div>

                {/* Select Car */}
                <div className="mb-3">
                    <label htmlFor="car" className="form-label">Select Car</label>
                    <select
                        className="form-select"
                        id="car"
                        value={selectedCar}
                        onChange={(e) => setSelectedCar(e.target.value)}
                    >
                        <option value="">Select a car</option>
                        {cars.map((car) => (
                            <option key={car.id} value={car.id}>
                                {car.name} ({car.model})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Start Date */}
                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Start Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>

                {/* End Date */}
                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">End Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>

                {/* Total Amount */}
                <div className="mb-3">
                    <label htmlFor="totalAmount" className="form-label">Total Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="totalAmount"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        required
                    />
                </div>

                {/* Status */}
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        className="form-select"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="completed">Completed</option>
                        {/* Add other status options if needed */}
                    </select>
                </div>

                {/* From Place */}
                <div className="mb-3">
                    <label htmlFor="fromPlace" className="form-label">From Place</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fromPlace"
                        value={fromPlace}
                        onChange={(e) => setFromPlace(e.target.value)}
                        required
                    />
                </div>

                {/* To Place */}
                <div className="mb-3">
                    <label htmlFor="toPlace" className="form-label">To Place</label>
                    <input
                        type="text"
                        className="form-control"
                        id="toPlace"
                        value={toPlace}
                        onChange={(e) => setToPlace(e.target.value)}
                        required
                    />
                </div>

                {/* Driver Name */}
                <div className="mb-3">
                    <label htmlFor="driverName" className="form-label">Driver Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="driverName"
                        value={driverName}
                        disabled
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit Booking</button>
            </form>
        </div>
    );
}

export default BookingAdding;
