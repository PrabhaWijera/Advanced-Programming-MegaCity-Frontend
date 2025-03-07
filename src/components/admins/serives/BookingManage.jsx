import React, { useEffect, useState } from "react";

import axios from "axios";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import imageDocument from "../../../assets/all-images/login/Black and Orange Car Rent Logo.png";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import BookingAdding from "./BookingAdding.jsx";
const API_URL = "http://localhost:8080/MegaCity_war_exploded"; // Backend URL

// Create a PDF Document for a Booking
const BookingReport = ({ booking, user, car }) => {
    const styles = StyleSheet.create({
        page: {
            padding: 20,
            backgroundColor: '#f4f4f4',
            fontFamily: 'Helvetica',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
            borderBottom: '2px solid #ddd',
            paddingBottom: 10,
        },
        logo: {
            width: 100,
            height: 100,
        },
        heading: {
            fontSize: 26,
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
            marginLeft: 10,
            alignSelf: 'center',
        },
        section: {
            marginTop: 20,
            padding: 15,
            backgroundColor: '#fff',
            borderRadius: 10,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: 20,
        },
        subheading: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 10,
        },
        content: {
            fontSize: 12,
            marginBottom: 6,
            color: '#555',
        },
        paragraph: {
            fontSize: 12,
            lineHeight: 1.6,
            color: '#555',
            marginBottom: 15,
        },
        divider: {
            borderBottom: '1px solid #eee',
            marginBottom: 20,
        },
        footer: {
            textAlign: 'center',
            fontSize: 10,
            color: '#777',
            paddingTop: 10,
        },
        footerDetails: {
            marginTop: 5,
            fontSize: 12,
            color: '#333',
        },
    });

    return (
        <Document>
            <Page style={styles.page}>
                {/* Header with Logo and Shop Name */}
                <View style={styles.header}>
                    <Image src={imageDocument} style={styles.logo} />
                    <Text style={styles.heading}>Mega City Car Services</Text>
                </View>
                {/* User Details Section */}
                <View style={styles.section}>
                    <Text style={styles.subheading}>User Information</Text>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Text style={styles.content}><strong>Booking ID:</strong> {booking.id}</Text>
                    {/* eslint-disable-next-line react/prop-types */}
                    {/*<Text style={styles.content}><strong>User Name:</strong> {user.email}</Text>*/}
                    {/* eslint-disable-next-line react/prop-types */}
                    <Text style={styles.content}><strong>User Phone:</strong> {user.phone}</Text>
                </View>

                {/* Booking Details Section */}
                <View style={styles.section}>
                    <Text style={styles.subheading}>Booking Details</Text>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Text style={styles.content}><strong>Start Date:</strong> {booking.startDate}</Text>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Text style={styles.content}><strong>End Date:</strong> {booking.endDate}</Text>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Text style={styles.content}><strong>Driver Name:</strong> {booking.driverName}</Text>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Text style={styles.content}><strong>From:</strong> {booking.fromPlace}</Text>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Text style={styles.content}><strong>To:</strong> {booking.toPlace}</Text>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Text style={styles.content}><strong>Amount:</strong> LKR {booking.totalAmount}</Text>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Text style={styles.content}><strong>Payment Status:</strong> {booking.status}</Text>
                </View>

                {/* Vehicle Details Section */}
                <View style={styles.section}>
                    <Text style={styles.subheading}>Vehicle Information</Text>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Text style={styles.content}><strong>Car Name:</strong> {car.name}</Text>
                    <Text style={styles.content}><strong>Plate Number:</strong> {car.plate_number}</Text>
                </View>

                {/* Paragraph about services */}
                {/* Footer with company contact details */}
                <View style={styles.footer}>
                    <Text> Thank you for choosing Mega City Car Services for your transportation needs. Our mission is to provide you with reliable, comfortable, and safe travel experiences. Should you have any inquiries or require further assistance, please don’t hesitate to contact us.</Text>
                    <Text style={styles.footerDetails}>Email: contact@megacitycarservices.com</Text>
                    <Text style={styles.footerDetails}>Phone: +94 123 456 789</Text>
                    <Text style={styles.footerDetails}>Website: www.megacitycarservices.com</Text>
                </View>



            </Page>
        </Document>
    );
};

// Admin Booking Panel Component
export default function BookingManage() {
    const [user, setUser] = useState(null);
    const [cars, setCars] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [selectedCar, setSelectedCar] = useState("");
    const [userId, setUserId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return; // No token, no need to fetch user

            try {
                const response = await axios.get(`${API_URL}/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
                setUserId(response.data.id);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    // Fetch cars data (including plate_number and name)
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`${API_URL}/uploadCarWithImage`);
                setCars(response.data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };
        fetchCars();
    }, []);

    // Fetch bookings data
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(`${API_URL}/booking`);
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        fetchBookings();
    }, []);

    // Handle booking submission
    // const handleBooking = (e) => {
    //     e.preventDefault();
    //     const bookingData = {
    //         userId: parseInt(userId),
    //         carId: parseInt(selectedCar),
    //         startDate,
    //         endDate,
    //     };
    //
    //     fetch(`${API_URL}/booking`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(bookingData),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             if (data.success) {
    //                 alert("Car booked successfully!");
    //                 setBookings((prevBookings) => [...prevBookings, data.booking]);
    //             } else {
    //                 alert("Booking failed!");
    //             }
    //         })
    //         .catch((err) => console.error("Error creating booking:", err));
    // };

    // Delete booking
    const deleteBooking = (id) => {
        if (!id) {
            console.error("No valid ID provided for deletion");
            return;
        }

        fetch(`${API_URL}/booking?id=${id}`, { method: "DELETE" })
            .then((res) => res.json())
            .then((data) => {
                if (data === "Booking Deleted Successfully") {
                    alert("Booking deleted!");
                    setBookings((prevBookings) =>
                        prevBookings.filter((booking) => booking.id !== id)
                    );
                } else {
                    alert("Delete failed!");
                }
            })
            .catch((err) => {
                console.error("Error deleting booking:", err);
                alert("An error occurred while trying to delete the booking.");
            });
    };

    // Update booking details
    const handleUpdate = async () => {
        if (!selectedBooking) return;

        const updatedBookingData = {
            status: selectedBooking.status,
            startDate,
            endDate,
        };

        try {
            const response = await fetch(`${API_URL}/booking/${selectedBooking.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBookingData),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Booking updated successfully!");
                setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking.id === selectedBooking.id ? { ...booking, ...updatedBookingData } : booking
                    )
                );
                setSelectedBooking(null);
            } else {
                alert("Update failed!");
            }
        } catch (error) {
            console.error("Error updating booking:", error);
            alert("An error occurred while updating the booking.");
        }
    };

    // Handle selecting booking for editing
    const selectBookingForEdit = (booking) => {
        setSelectedBooking(booking);
        setSelectedCar(booking.carId);
        setStartDate(booking.startDate);
        setEndDate(booking.endDate);
    };

    // Handle status change in the modal
    const handleStatusChange = (e) => {
        setSelectedBooking((prevBooking) => ({
            ...prevBooking,
            status: e.target.value,
        }));
    };

    return (
        <div className="container mt-4 mb-4">
            <Link to={'/admin'} className='mb-2'>
                <Button variant="outline-dark" >
                    🔙
                </Button>
            </Link>
            <div className="card p-4 mb-4">
                <BookingAdding/>
            </div>
            {/* Car Booking Form */}
            {/*<div className="card p-4 mb-4">*/}
            {/*    <h3>Book a Car</h3>*/}
            {/*    <form >*/}
            {/*        <div className="mb-3">*/}
            {/*            <label htmlFor="car" className="form-label">Select Car</label>*/}
            {/*            <select*/}
            {/*                id="car"*/}
            {/*                className="form-select"*/}
            {/*                value={selectedCar}*/}
            {/*                onChange={(e) => setSelectedCar(e.target.value)}*/}
            {/*                required*/}
            {/*            >*/}
            {/*                <option value="">Select a Car</option>*/}
            {/*                {cars.map((car) => (*/}
            {/*                    <option key={car.id} value={car.id}>{car.name}</option>*/}
            {/*                ))}*/}
            {/*            </select>*/}
            {/*        </div>*/}
            {/*        <div className="mb-3">*/}
            {/*            <label htmlFor="startDate" className="form-label">Start Date</label>*/}
            {/*            <input*/}
            {/*                type="date"*/}
            {/*                id="startDate"*/}
            {/*                className="form-control"*/}
            {/*                value={startDate}*/}
            {/*                onChange={(e) => setStartDate(e.target.value)}*/}
            {/*                required*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="mb-3">*/}
            {/*            <label htmlFor="endDate" className="form-label">End Date</label>*/}
            {/*            <input*/}
            {/*                type="date"*/}
            {/*                id="endDate"*/}
            {/*                className="form-control"*/}
            {/*                value={endDate}*/}
            {/*                onChange={(e) => setEndDate(e.target.value)}*/}
            {/*                required*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <button type="submit" className="btn btn-primary">Book Car</button>*/}
            {/*    </form>*/}
            {/*</div>*/}

            {/* Bookings List */}
            <div className="card p-4">
                <h3>Bookings</h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Car Name</th>
                        <th>Plate Number</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map((booking) => {
                        const car = cars.find(car => car.id === booking.carId); // Find the car for the booking
                        return (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.userId}</td>
                                <td>{car ? car.name : "Loading..."}</td>
                                <td>{car ? car.plate_number : "Loading..."}</td>
                                <td>{booking.startDate}</td>
                                <td>{booking.endDate}</td>
                                <td>{booking.status}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => selectBookingForEdit(booking)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => deleteBooking(booking.id)}
                                    >
                                        Delete
                                    </button>
                                    <PDFDownloadLink
                                        document={<BookingReport booking={booking} user={user} car={car} />} // Pass car data here
                                        fileName={`booking_report_${booking.id}.pdf`}
                                    >
                                        {({ loading }) =>
                                            loading ? "Loading..." : (
                                                <button className="btn btn-primary btn-sm">Generate PDF</button>
                                            )
                                        }
                                    </PDFDownloadLink>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {/* Edit Booking Modal */}
            {selectedBooking && (
                <div className="modal show" style={{ display: "block" }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Booking</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setSelectedBooking(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <select
                                        id="status"
                                        className="form-select"
                                        value={selectedBooking.status}
                                        onChange={handleStatusChange}
                                    >
                                        <option value="Booked">Booked</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="startDate" className="form-label">Start Date</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="endDate" className="form-label">End Date</label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        className="form-control"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setSelectedBooking(null)}>
                                        Close
                                    </button>
                                    <button className="btn btn-primary" onClick={handleUpdate}>
                                        Update Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
