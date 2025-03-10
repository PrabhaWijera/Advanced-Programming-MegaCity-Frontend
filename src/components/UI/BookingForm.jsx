import React, { useEffect, useState } from "react";
import "../../styles/booking-form.css";
import { Col, Form } from "reactstrap";
import axios from "axios";
import PaymentMethod from "./PaymentMethod.jsx";
import placesandprces from "../../assets/data/placeandprice.json";
import ToastNotification, {showToast} from "./ToastNotification.jsx"; // Ensure this path is correct

const BookingForm = ({ carData, backendCarData }) => {
    const [user, setUser] = useState(null);
    const [cars, setCars] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedCar, setSelectedCar] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [status, setStatus] = useState('completed');
    const [fromPlace, setFromPlace] = useState('');
    const [toPlace, setToPlace] = useState('');
    const [price, setPrice] = useState(null);
    const [driverName, setDriverName] = useState('');
    const [routes, setRoutes] = useState([]); // To store the fetched routes
    const [IsVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                setRoutes(placesandprces.routes); // Load route data
            } catch (error) {
                console.error("Error fetching routes:", error);
            }
        };

        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get('http://localhost:8080/MegaCity_war_exploded/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage');
                setCars(response.data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/MegaCity_war_exploded/users');
                const users = response.data;
                const drivers = users.filter(user => user.role === 'driver');

                if (drivers.length > 0) {
                    const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
                    setDriverName(randomDriver.username);
                }
            } catch (error) {
                console.error("Error fetching users data:", error);
            }
        };

        fetchRoutes();
        fetchUser();
        fetchCars();
        fetchUsers();
    }, []);

    const handleFromChange = (e) => {
        setFromPlace(e.target.value);
        setToPlace('');
        setPrice(null);
        setTotalAmount(0);
    };

    const handleToChange = (e) => {
        const selectedToPlace = e.target.value;
        setToPlace(selectedToPlace);

        const route = routes.find(route => route.from === fromPlace && route.to === selectedToPlace);
        if (route) {
            setPrice(route.price);
        } else {
            setPrice(null);
            setTotalAmount(0);
        }
    };

    useEffect(() => {
        if (price && startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const days = Math.max(1, (end - start) / (1000 * 3600 * 24)); // Minimum of 1 day
            setTotalAmount(price * days);
        }
    }, [price, startDate, endDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!startDate || !endDate || !fromPlace || !toPlace || !price) {
            alert("Please fill in all required fields.");
            return;
        }

        const bookingData = {
            userId: user?.id,
            carId: backendCarData.carID,
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
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            if (response.status === 200) {
                setIsVisible(true);
                showToast(200, "Book is successfully! ✅");
            }

            alert(response.data);
        } catch (error) {
            console.error('Error creating booking', error);
            showToast(500, "Error: Something went wrong! ❌");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <ToastNotification />
                <Col lg="12" className="mb-5">
                    <Form onSubmit={handleSubmit}>
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

                        <div className="mb-3">
                            <label htmlFor="totalAmount" className="form-label">Total Amount</label>
                            <input
                                type="number"
                                className="form-control"
                                id="totalAmount"
                                value={totalAmount}
                                disabled
                            />
                        </div>

                        {price && (
                            <div className="mb-3">
                                <p className="fw-bold">Price for {fromPlace} to {toPlace}: RS.{price}.00 per day</p>
                            </div>
                        )}

                        <div className="mb-3">
                            <label htmlFor="fromPlace" className="form-label">From Place</label>
                            <select
                                className="form-control"
                                id="fromPlace"
                                value={fromPlace}
                                onChange={handleFromChange}
                                required
                            >
                                <option value="">Select From Place</option>
                                {[...new Set(routes.map(route => route.from))].map(place => (
                                    <option key={place} value={place}>{place}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="toPlace" className="form-label">To Place</label>
                            <select
                                className="form-control"
                                id="toPlace"
                                value={toPlace}
                                onChange={handleToChange}
                                required
                            >
                                <option value="">Select To Place</option>
                                {fromPlace && routes.filter(route => route.from === fromPlace).map(route => (
                                    <option key={route.to} value={route.to}>{route.to}</option>
                                ))}
                            </select>
                        </div>

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
                    </Form>
                </Col>

                {IsVisible && (
                    <Col lg="12" className="mt-5">
                        <PaymentMethod UserData={user?.id} BookingData={totalAmount}/>
                    </Col>
                )}
            </div>
        </div>
    );
};

export default BookingForm;
