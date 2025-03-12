import React, { useEffect, useState } from "react";
import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../styles/payment-method.css";
import axios from "axios";
import QRCodeGenerator from "./QRCodeGenerator.jsx";
import ToastNotification, { showToast } from "./ToastNotification.jsx";
import BookingReport from "./BookingReport";  // Import PDF component
import { PDFDownloadLink } from "@react-pdf/renderer"; // Import PDF downloader

const API_URL = "http://localhost:8080/MegaCity_war_exploded/payment";
const USER_PROFILE_URL = "http://localhost:8080/MegaCity_war_exploded/profile";
const BOOKING_URL = "http://localhost:8080/MegaCity_war_exploded/booking";

const generateTransactionId = () => {
    return "TXN-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
};

// eslint-disable-next-line react/prop-types
const PaymentMethod = ({ UserData, BookingData }) => {
    const [payments, setPayments] = useState([]);
    const [qrData, setQrData] = useState("");
    const [BookingDetails, setBookingDetails] = useState(null);
    const [showDownloadLink, setShowDownloadLink] = useState(false); // To show the download button after payment

    const [formData, setFormData] = useState({
        bookingId: BookingDetails,
        userId: UserData.userId,
        paymentAmount: BookingData,
        currency: "LKR",
        paymentMethod: "credit_card",
        paymentStatus: "",
        transactionId: generateTransactionId(),
    });

    const [UserDatafroReport, setUserDatafroReport] = useState({
        userId: UserData.userId,
        userEmail: UserData.userEmail,
    });

    useEffect(() => {
        axios.get(API_URL)
            .then(response => setPayments(response.data))
            .catch(error => console.error("Error fetching payments:", error));
        console.log("UserData.id", UserData);
    }, []);

    const fetchBookingDetails = async (userId) => {
        try {
            const response = await axios.get(BOOKING_URL, {
                params: { userId }
            });
            if (response.data && response.data.length > 0) {
                const booking = response.data[0]; // Assuming first booking is relevant
                setBookingDetails(booking);
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
                    setFormData(prevData => ({
                        ...prevData,
                        userId: data.id,  // Store userId
                        userEmail: data.email  // Store userEmail
                    }));
                    setUserDatafroReport({
                        userId: data.id,
                        userEmail: data.email,
                    });
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, formData);

            if (response.status === 201) {
                showToast(201, "Payment successful! ✅");
                setQrData(JSON.stringify(formData));
                setShowDownloadLink(true); // Show PDF download button
            }
        } catch (error) {
            showToast(500, "Error: Something went wrong! ❌");
            console.error("Error:", error);
        }
    };

    const handleDownload = (imageURL) => {
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = 'QR.png';
        link.click();
    };

    return (
        <div className="container mt-5">
            <ToastNotification />
            <form onSubmit={handleSubmit}>
                <div className="payment mt-3">
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
                            readOnly
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Make Payment</button>

                    {qrData && <QRCodeGenerator data={qrData} onDownload={handleDownload} />}

                    {/* PDF Download Button */}
                    {showDownloadLink && BookingDetails && (
                        <div className="mt-3">
                            <PDFDownloadLink
                                document={
                                    <BookingReport
                                        booking={{
                                            transactionId: formData.transactionId,
                                            paymentAmount: formData.paymentAmount,
                                            paymentStatus: formData.paymentStatus,
                                            currency: formData.currency,  // Pass currency
                                            paymentMethod: formData.paymentMethod,  // Pass paymentMethod
                                            bookingId: formData.bookingId,  // Pass bookingId
                                        }}
                                        UserDatafroReport={{
                                            userId: UserDatafroReport.userId,
                                            userEmail: UserDatafroReport.userEmail,
                                        }}
                                    />
                                }
                                fileName={`Payment_Report_${formData.transactionId}.pdf`}
                                className="btn btn-success w-100 mt-2"
                                onClick={() => {
                                    // Log user details to the console
                                    console.log('User Details:', {
                                        userId: UserDatafroReport.userId,
                                        userEmail: UserDatafroReport.userEmail,
                                    });
                                    console.log('Booking Details:', {
                                        transactionId: formData.transactionId,
                                        paymentAmount: formData.paymentAmount,
                                        paymentStatus: formData.paymentStatus,
                                        currency: formData.currency,
                                        paymentMethod: formData.paymentMethod,
                                        bookingId: formData.bookingId,
                                    });
                                }}
                            >
                                {({ loading }) => (loading ? 'Generating PDF...' : 'Download Payment Receipt')}
                            </PDFDownloadLink>
                        </div>
                    )}

                </div>
            </form>
        </div>
    );
};

export default PaymentMethod;
