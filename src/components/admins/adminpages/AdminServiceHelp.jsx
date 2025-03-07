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
                                        <Button variant="outline-dark" >
                                            🔙
                                        </Button>
                                    </Link>
                                    <h5>System Workflow:</h5>
                                    <ul>
                                        <li>Admin logs into the system using credentials.</li>
                                        <li>Admin can manage users: Add, update, or remove users.</li>
                                        <li>Admin can manage cars: Approve, update, or remove listings.</li>
                                        <li>Admin oversees booking requests and service history.</li>
                                        <li>System maintains logs for security and reporting.</li>
                                        <li>Admins can access FAQs and customer support.</li>
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
