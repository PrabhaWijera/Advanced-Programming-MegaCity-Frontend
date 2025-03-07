import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/MegaCity_war_exploded/payment";
const USER_PROFILE_URL = "http://localhost:8080/MegaCity_war_exploded/profile";
const BOOKING_URL = "http://localhost:8080/MegaCity_war_exploded/booking";

const Payment = () => {
    const [payments, setPayments] = useState([]);
    const [formData, setFormData] = useState({
        bookingId: "",
        userId: "",
        paymentAmount: "",
        currency: "USD",
        paymentMethod: "credit_card",
        paymentStatus: "",  // Default value
        transactionId: ""
    });

    const [paymentStatusUpdate, setPaymentStatusUpdate] = useState(""); // for update
    const [paymentIdToUpdate, setPaymentIdToUpdate] = useState(""); // to store the id of the payment to update

    // Fetch payments from backend
    useEffect(() => {
        axios.get(API_URL)
            .then(response => setPayments(response.data))
            .catch(error => console.error("Error fetching payments:", error));
    }, []);

    // Fetch user profile
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
                    // Set the user ID automatically
                    setFormData(prevData => ({ ...prevData, userId: data.id }));
                    fetchBookingDetails(data.id); // Fetch booking details using the user ID
                } else {
                    console.error('Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchProfile();
    }, []);

    // Fetch booking details based on userId
    const fetchBookingDetails = async (userId) => {
        try {
            const response = await axios.get(BOOKING_URL, {
                params: { userId }
            });
            if (response.data && response.data.length > 0) {
                // Assuming the first booking is the one you want
                const booking = response.data[0];
                // Set the bookingId based on the user's booking
                setFormData(prevData => ({ ...prevData, bookingId: booking.id }));
            } else {
                console.error('No booking details found for this user');
            }
        } catch (error) {
            console.error('Error fetching booking details:', error);
        }
    };

    // Handle form input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit new payment
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, formData);
            alert("Payment successful!");
            window.location.reload();
        } catch (error) {
            alert("Payment failed!");
            console.error("Error:", error);
        }
    };

    // Handle Update Payment
    const handleUpdatePayment = async (paymentId) => {
        const requestPayload = { paymentStatus: paymentStatusUpdate };

        try {
            await axios.put(`${API_URL}?id=${paymentId}`, requestPayload, {
                headers: { 'Content-Type': 'application/json' }
            });
            alert("Payment status updated successfully!");
            window.location.reload();
        } catch (error) {
            alert("Error updating payment!");
            console.error("Error:", error);
        }
    };

    // Handle Delete Payment
    const handleDeletePayment = async (paymentId) => {
        try {
            await axios.delete(`${API_URL}?id=${paymentId}`);
            alert("Payment deleted successfully!");
            window.location.reload();
        } catch (error) {
            alert("Error deleting payment!");
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow-sm">
                <h3 className="mb-3">Make a Payment</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Booking ID:</label>
                            <input type="number" className="form-control" name="bookingId" value={formData.bookingId} onChange={handleChange} required readOnly />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">User ID:</label>
                            <input type="number" className="form-control" name="userId" value={formData.userId} onChange={handleChange} required readOnly />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Amount:</label>
                            <input type="number" className="form-control" name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Currency:</label>
                            <select className="form-select" name="currency" value={formData.currency} onChange={handleChange}>
                                <option value="USD">LKR</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Payment Method:</label>
                            <select className="form-select" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                                <option value="credit_card">Credit Card</option>
                                <option value="debit_card">Debit Card</option>
                                <option value="cash">Cash</option>
                                <option value="online">Online</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Payment Status:</label>
                            <select className="form-select" name="paymentStatus" value={formData.paymentStatus} onChange={handleChange}>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Transaction ID:</label>
                            <input type="text" className="form-control" name="transactionId" value={formData.transactionId} onChange={handleChange} />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary w-100">Make Payment</button>
                        </div>
                    </div>
                </form>
            </div>

            <h3 className="mt-5">Payment History</h3>
            <table className="table table-striped table-hover mt-3">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Booking ID</th>
                    <th>User ID</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Transaction ID</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((payment) => (
                    <tr key={payment.id}>
                        <td>{payment.id}</td>
                        <td>{payment.bookingId}</td>
                        <td>{payment.userId}</td>
                        <td>{payment.paymentAmount} {payment.currency}</td>
                        <td>{payment.paymentMethod}</td>
                        <td>{payment.paymentStatus}</td>
                        <td>{payment.transactionId || "N/A"}</td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => {
                                setPaymentIdToUpdate(payment.id);
                                setPaymentStatusUpdate(payment.paymentStatus);
                            }}>Update Status</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDeletePayment(payment.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {paymentIdToUpdate && (
                <div className="card p-3 mt-4">
                    <h4>Update Payment Status</h4>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdatePayment(paymentIdToUpdate);
                    }}>
                        <label className="form-label">New Status:</label>
                        <select className="form-select mb-2" value={paymentStatusUpdate} onChange={(e) => setPaymentStatusUpdate(e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                        </select>
                        <button type="submit" className="btn btn-success w-100">Update Status</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Payment;
