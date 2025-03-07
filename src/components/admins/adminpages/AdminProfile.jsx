import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaCar, FaUsers } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminProfile = () => {
    const [admin, setAdmin] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdminProfile = async () => {
            const token = localStorage.getItem("token"); // Get JWT token from localStorage
            if (!token) {
                setError("No token found. Please log in.");
                setLoading(false);
                return;
            }

            try {
                // Fetch admin profile from backend
                const response = await axios.get("http://localhost:8080/MegaCity_war_exploded/admin/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAdmin(response.data); // Store profile data in state

                // Check if there's an image URL saved in localStorage
                const storedImage = localStorage.getItem("profileImage");
                if (storedImage) {
                    setImagePreview(storedImage); // Set the preview image from localStorage
                }
            } catch (err) {
                setError("Failed to fetch profile: " + err.message);
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchAdminProfile();
    }, []);

    // Handle error state
    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    // Handle loading state
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" />
            </div>
        );
    }

    // If no admin data is found, display an error
    if (!admin) {
        return <Alert variant="warning">No admin data found.</Alert>;
    }

    return (
        <Container fluid>
            <Row>
                <Col md={3} className="bg-dark text-white p-4" style={{ minHeight: "100vh" }}>
                    <h4>Megacity Car Service</h4>
                    <h5 className="fw-bold">Admin Profile</h5>
                    <hr />
                    <div className="text-center mb-3">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Profile"
                                className="img-fluid rounded-circle"
                                style={{ maxWidth: "150px" }}
                            />
                        ) : (
                            <FaUser size={150} />
                        )}
                    </div>
                    <Button variant="light" className="w-100 mb-2">Edit Profile</Button>
                    <Button variant="light" className="w-100 mb-2">Change Password</Button>
                    <Button variant="light" className="w-100 mb-2">Log Out</Button>
                </Col>

                <Col md={9} className="p-4">
                    <Row>
                        <Col md={12}>
                            <Card className="shadow-sm p-4">
                                <h4 className="mb-4">Admin Information</h4>
                                <Row>
                                    <Col md={6}>
                                        <p><strong>Name:</strong> {admin.name}</p>
                                        <p><strong>Email:</strong> {admin.email}</p>
                                        <p><strong>Phone:</strong> {admin.phone || "N/A"}</p>
                                    </Col>
                                    <Col md={6}>
                                        <p><strong>Role:</strong> {admin.role || "Admin"}</p>
                                        <p><strong>Managed Users:</strong> {admin.managedUsers || 0}</p>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    {/* Display the list of users managed by the admin */}
                    {admin.managedUsers > 0 && (
                        <Row className="my-4">
                            <Col md={12}>
                                <Card className="shadow-sm p-4">
                                    <h4 className="mb-4">Managed Users</h4>
                                    <ul>
                                        {admin.managedUsersList.map((user, index) => (
                                            <li key={index}>
                                                <strong>{user.name}</strong> - {user.email}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </Col>
                        </Row>
                    )}

                    {/* Admin's Car Fleet Details */}
                    {admin.carFleet && admin.carFleet.length > 0 && (
                        <Row className="my-4">
                            <Col md={12}>
                                <Card className="shadow-sm p-4">
                                    <h4 className="mb-4">Car Fleet</h4>
                                    <Row>
                                        {admin.carFleet.map((car, index) => (
                                            <Col key={index} md={4}>
                                                <Card className="shadow-sm p-3">
                                                    <FaCar size={40} />
                                                    <h5>{car.model}</h5>
                                                    <p><strong>Brand:</strong> {car.brand}</p>
                                                    <p><strong>Year:</strong> {car.year}</p>
                                                    <Button variant="outline-dark">View Details</Button>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default AdminProfile;
