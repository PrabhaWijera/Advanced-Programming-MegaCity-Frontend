import React, { useEffect, useState } from "react";
import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../styles/payment-method.css";
import axios from "axios";
import QRCodeGenerator from "./QRCodeGenerator.jsx";

const API_URL = "http://localhost:8080/MegaCity_war_exploded/payment";
const USER_PROFILE_URL = "http://localhost:8080/MegaCity_war_exploded/profile";
const BOOKING_URL = "http://localhost:8080/MegaCity_war_exploded/booking";

const generateTransactionId = () => {
    return "TXN-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
};

// eslint-disable-next-line react/prop-types
const PaymentMethod = ({UserData,BookingData}) => {
    const [payments, setPayments] = useState([]);
    const [qrData, setQrData] = useState("");
    const[BookingDetails,setBookingDetails]=useState(null);
    const [formData, setFormData] = useState({
        bookingId: BookingDetails,
        // eslint-disable-next-line react/prop-types
        userId: UserData,
        paymentAmount: BookingData,
        currency: "LKR",
        paymentMethod: "credit_card",
        paymentStatus: "",
        transactionId: generateTransactionId()
    });

    const [paymentStatusUpdate, setPaymentStatusUpdate] = useState("");
    const [paymentIdToUpdate, setPaymentIdToUpdate] = useState("");

    useEffect(() => {

        axios.get(API_URL)
            .then(response => setPayments(response.data))
            .catch(error => console.error("Error fetching payments:", error));
        console.log("UserData.id",UserData);
    }, []);

    const fetchBookingDetails = async (userId) => {
        try {
            const response = await axios.get(BOOKING_URL, {
                params: { userId }
            });
            if (response.data && response.data.length > 0) {
                // Assuming the first booking is the one you want
                const booking = response.data[0];
                // Set the bookingId based on the user's booking
                setBookingDetails(booking.id)
                setFormData(prevData => ({ ...prevData, bookingId: booking.id }));
            } else {
                console.error('No booking details found for this user');
            }
        } catch (error) {
            console.error('Error fetching booking details:', error);
        }
    };
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authentication token found');
                return;
            }

            try {
                const response = await fetch(USER_PROFILE_URL, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData(prevData => ({ ...prevData, userId: data.id }));
                    fetchBookingDetails(data.id);
                } else {
                    console.error('Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchProfile();
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit new payment
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post(API_URL, formData);
    //         alert("Payment successful!");
    //     } catch (error) {
    //         alert("Payment failed!");
    //         console.error("Error:", error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, formData);

            if (response.status === 201) {
                console.log("Payment was created successfully:", response.data);
                setQrData(JSON.stringify(formData));
            }

            alert("Payment successful!");
        } catch (error) {
            alert("Payment failed!");
            console.error("Error:", error);
        }
    };

    const handleDownload = (imageURL) => {
        // Create an anchor element to download the image
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = 'QR.png'; // Set the download file name
        link.click(); // Trigger the download
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>

                <div className="payment mt-3">
                    <div className="mb-3">
                        <label htmlFor="bookingId" className="form-label">Booking ID:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="bookingId"
                            id="bookingId"
                            value={formData.bookingId}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="userId" className="form-label">User ID:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="userId"
                            id="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="paymentAmount" className="form-label">Amount:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="paymentAmount"
                            id="paymentAmount"
                            value={formData.paymentAmount}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="currency" className="form-label">Currency:</label>
                        <select name="currency" id="currency" className="form-select" value={formData.currency}
                                onChange={handleChange}>
                            <option value="LKR">LKR</option>

                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="paymentStatus" className="form-label">Payment Status:</label>
                        <select name="paymentStatus" id="paymentStatus" className="form-select"
                                value={formData.paymentStatus} onChange={handleChange}>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="transactionId" className="form-label">Transaction ID:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="transactionId"
                            id="transactionId"
                            value={formData.transactionId}
                            onChange={handleChange}
                            readOnly // Prevent user from modifying it
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Make Payment</button>
                    {/* Display QR code if data is available */}
                    {qrData && <QRCodeGenerator data={qrData} onDownload={handleDownload} />}
                </div>
            </form>
        </div>

    );
};

export default PaymentMethod;
