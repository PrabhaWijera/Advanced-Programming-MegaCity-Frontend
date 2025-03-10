import React from 'react';
import { Card, Button, Form, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const UserManual = () => {
    return (
        <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="p-3">
                    <Link to={'/home'} className='mb-4'>
                        <Button variant="outline-dark">
                            🔙 Back to Home
                        </Button>
                    </Link>
                    <h5>User Manual:</h5>
                    <ul>
                        <li><strong>Step 1: Register</strong></li>
                        <ul>
                            <li>Go to the registration page and enter your details (Name, Email, Password, etc.).</li>
                            <li>Click on the "Register" button to create your account.</li>
                            <li>After registering, navigate to the Login page.</li>
                            <li>Use your registered email and password to log in to your account.</li>
                        </ul>
                        <li><strong>Step 2: Navigate to the Home Page</strong></li>
                        <ul>
                            <li>After logging in, you will be directed to the home page with a beautiful UI displaying the main features.</li>
                        </ul>
                        <li><strong>Step 3: Navigate to the Cars Page</strong></li>
                        <ul>
                            <li>Click on the "Cars" tab from the navigation bar to view available cars.</li>
                            <li>You can search for cars by name or plate number by typing in the "Search" field.</li>
                            <li>Use filters to narrow down the search results:</li>
                            <ul>
                                <li><strong>Filter by Model:</strong> Select a model from the dropdown.</li>
                                <li><strong>Filter by Year:</strong> Select a year from the dropdown.</li>
                                <li><strong>Filter by Status:</strong> Choose a car status (Available, Booked, etc.) from the dropdown.</li>
                            </ul>
                            <li>Once you find the car you are interested in, click the "Details" button to see more details about the car.</li>
                        </ul>
                        <li><strong>Step 4: Car Details Page</strong></li>
                        <ul>
                            <li>On the Car Details page, you can view detailed information about the car, including its model, year, price, and more.</li>
                            <li>If you want to book the car, click on the "Book Now" button to proceed.</li>
                        </ul>
                        <li><strong>Step 5: Booking Form</strong></li>
                        <ul>
                            <li>Fill out the booking form with the following details:</li>
                            <ul>
                                <li><strong>Start Date:</strong> Enter the start date of your booking (mm/dd/yyyy).</li>
                                <li><strong>End Date:</strong> Enter the end date of your booking (mm/dd/yyyy).</li>
                                <li><strong>Total Amount:</strong> This will be automatically calculated based on the car, dates, and pricing.</li>
                                <li><strong>From Place:</strong> Select the pick-up location.</li>
                                <li><strong>To Place:</strong> Enter the drop-off location, and a driver will be automatically assigned.</li>
                                <li><strong>Total Amount & Per Day Amount:</strong> You will see the total amount for the booking and the per-day rate.</li>
                            </ul>
                            <li>Once all details are filled out, click on the "Submit" button to proceed with the booking.</li>
                        </ul>
                        <li><strong>Step 6: Payment</strong></li>
                        <ul>
                            <li>After submitting the booking details, you will be redirected to the payment page.</li>
                            <li>Fill out the following details:</li>
                            <ul>
                                <li><strong>Payment Status:</strong> Choose the payment status (Pending/Completed).</li>
                                <li><strong>Transaction ID:</strong> This will be automatically generated as a unique identifier for the payment.</li>
                            </ul>
                            <li>Click on "Complete Payment" to finish the payment process.</li>
                        </ul>
                        <li><strong>Step 7: QR Code Generation</strong></li>
                        <ul>
                            <li>Once the payment is successful, a unique QR code will be generated for your booking.</li>
                            <li>You can download this QR code for future reference (e.g., for entry or verification).</li>
                        </ul>
                        <li><strong>Step 8: Confirmation</strong></li>
                        <ul>
                            <li>After the booking is completed, you will receive a confirmation email with the booking details and your QR code.</li>
                        </ul>
                    </ul>
                </Card>
            </motion.div>
        </div>
    );
}

export default UserManual;
