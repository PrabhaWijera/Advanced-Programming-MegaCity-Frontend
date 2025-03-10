import React from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaTools, FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AdminDashboard = () => {
    return (
        <Container fluid>
            <Navbar bg="dark" variant="dark" className="justify-content-between px-4">
                <Navbar.Brand>
                    <h4>Megacity Car Service</h4>
                </Navbar.Brand>
                {/*<Nav>*/}
                {/*    <Dropdown className="me-3">*/}
                {/*        <Button variant="secondary" id="admin-service">*/}
                {/*            <Link to={'/admin-faq'}>*/}
                {/*                <FaTools size={24} /> Admin Services*/}
                {/*            </Link>*/}
                {/*        </Button>*/}
                {/*    </Dropdown>*/}
                {/*    <Dropdown>*/}
                {/*        <Dropdown.Toggle variant="secondary" id="user-profile">*/}
                {/*            <FaUserCircle size={24} /> Profile*/}
                {/*        </Dropdown.Toggle>*/}
                {/*        <Dropdown.Menu>*/}
                {/*            <Dropdown.Item>*/}
                {/*                <Link to="/admin-profile">View Profile</Link>*/}
                {/*            </Dropdown.Item>*/}
                {/*        </Dropdown.Menu>*/}
                {/*    </Dropdown>*/}
                {/*</Nav>*/}
            </Navbar>

            <Row>


                <Col md={9} className="p-4">
                    <Row>
                        <Col>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <Card className="p-3">
                                    <Link to={'/admin'} className='mb-4'>
                                        <Button variant="outline-dark">
                                            🔙
                                        </Button>
                                    </Link>
                                    <h5>System Workflow:</h5>
                                    <ul>
                                        <li><strong>Login:</strong> Log in using your Admin credentials.</li>
                                        <li><strong>Admin Services:</strong> Admin has several services available:</li>
                                        <ul>
                                            <li><strong>User Management:</strong>
                                                <ul>
                                                    <li>Create users.</li>
                                                    <li>Update user details.</li>
                                                    <li>Delete users.</li>
                                                    <li>View all users.</li>
                                                </ul>
                                            </li>
                                            <li><strong>Car Management:</strong>
                                                <ul>
                                                    <li>Add new car listings.</li>
                                                    <li>Update car details.</li>
                                                    <li>Delete car listings.</li>
                                                    <li>Filter cars by search, status, model, and year.</li>
                                                    <li>View all car listings.</li>
                                                </ul>
                                            </li>
                                            <li><strong>Booking Management:</strong>
                                                <ul>
                                                    <li>Manage booking requests.</li>
                                                    <li>View detailed booking data.</li>
                                                </ul>
                                            </li>
                                            <li><strong>Payment Management:</strong>
                                                <ul>
                                                    <li>Add new payment records.</li>
                                                    <li>Update payment status.</li>
                                                    <li>Delete payment records.</li>
                                                    <li>View all payment records.</li>
                                                </ul>
                                            </li>
                                            <li><strong>QR Code Management:</strong>
                                                <ul>
                                                    <li>Upload and verify customer QR codes.</li>
                                                    <li>View QR code data in a table.</li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <li><strong>Admin Dashboard:</strong> The Admin Dashboard provides dynamic insights into system data, including:</li>
                                        <ul>
                                            <li>Total number of users.</li>
                                            <li>Total number of cars listed.</li>
                                            <li>Booking rating.</li>
                                        </ul>
                                        <li><strong>System Insights:</strong> The Admin can also monitor the system’s health and performance:</li>
                                        <ul>
                                            <li>Website stress and performance metrics.</li>
                                            <li>Data volume metrics.</li>
                                            <li>Internet network speed.</li>
                                            <li>Backend system status (whether it’s live or not).</li>
                                        </ul>
                                    </ul>
                                </Card>
                            </motion.div>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;
