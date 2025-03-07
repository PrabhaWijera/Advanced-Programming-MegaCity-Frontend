import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DriverBookings() {
    const [user, setUser] = useState(null);
    const [drivers, setDrivers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [driverBookings, setDriverBookings] = useState([]);

    // Fetch user data (logged-in user) from the profile endpoint
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token"); // Assume JWT token is stored in localStorage
            try {
                const response = await axios.get('http://localhost:8080/MegaCity_war_exploded/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/MegaCity_war_exploded/users');
                const users = response.data;

                // Filter users to get only those with the role of 'driver'
                const filteredDrivers = users.filter(user => user.role === 'driver');
                setDrivers(filteredDrivers);
            } catch (error) {
                console.error("Error fetching users data:", error);
            }
        };

        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/MegaCity_war_exploded/booking');
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchUser();
        fetchUsers();
        fetchBookings();
    }, []);

    // Filter related bookings for the logged-in driver
    useEffect(() => {
        if (user && user.role === 'driver') {
            const relatedBookings = bookings.filter(booking => booking.driverName === user.username);
            setDriverBookings(relatedBookings);
        }
    }, [user, bookings]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Driver Bookings</h2>
            {user && user.role === 'driver' ? (
                <div>
                    <h3>Welcome, {user.username}</h3>
                    <h4>Your Bookings:</h4>
                    {driverBookings.length > 0 ? (
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Booking ID</th>
                                <th scope="col">Car</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End Date</th>
                                <th scope="col">From Place</th>
                                <th scope="col">To Place</th>
                                <th scope="col">Total Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {driverBookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.carName}</td>
                                    <td>{booking.startDate}</td>
                                    <td>{booking.endDate}</td>
                                    <td>{booking.fromPlace}</td>
                                    <td>{booking.toPlace}</td>
                                    <td>{booking.totalAmount}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No bookings found for you.</p>
                    )}
                </div>
            ) : (
                <p>You are not a driver, or you are not logged in as a driver.</p>
            )}
        </div>
    );
}

export default DriverBookings;
