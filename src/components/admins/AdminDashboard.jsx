import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaUsers, FaCar, FaStar, FaUserCircle, FaTools, FaServer } from "react-icons/fa";
import Chart from "react-apexcharts";
import ReactSpeedometer from "react-d3-speedometer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // For server status animation
import { useSpring, animated } from "react-spring"; // For internet speed animation

const AdminDashboard = () => {
    const [users, setUsers] = useState(0);
    const [cars, setCars] = useState(0);
    const [stress, setStress] = useState(0);
    const [performance, setPerformance] = useState(0);
    const [dataVolume, setDataVolume] = useState(0);
    const [internetSpeed, setInternetSpeed] = useState(null);
    const [serverStatus, setServerStatus] = useState("Checking...");

    const [reviews, setReviews] = useState([]);  // State to store reviews
    const [loading, setLoading] = useState(false);  // State for loading state
    const [error, setError] = useState(null);  // State for errors

    const token = localStorage.getItem('token');

    // Fetch initial data from server (users and cars data)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch("http://localhost:8080/MegaCity_war_exploded/users");
                const userData = await userResponse.json();
                setUsers(userData.length);

                const carResponse = await fetch("http://localhost:8080/MegaCity_war_exploded/filteringUserCars");
                const carData = await carResponse.json();
                setCars(carData.length);
            } catch (error) {
                console.error("Error fetching users or cars:", error);
            }
        };
        fetchData();

        fetchMetrics();

        const intervalId = setInterval(fetchMetrics, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const fetchMetrics = () => {
        const stressValue = calculateStress();
        setStress(stressValue);

        if (window.performance) {
            const performanceData = window.performance.timing;
            const pageLoadTime = performanceData.loadEventEnd - performanceData.navigationStart;
            setPerformance(pageLoadTime);
        }

        if (navigator.connection) {
            const connection = navigator.connection;
            const dataUsage = connection.downlink * 100;
            setDataVolume(dataUsage);
            const downloadSpeed = connection.downlink;
            setInternetSpeed(`${downloadSpeed.toFixed(2)} Mbps`);
        }

        checkServerStatus();
    };

    const calculateStress = () => {
        return Math.random() * 100;  // Random stress value between 0 and 100
    };

    const checkServerStatus = async () => {
        try {
            const response = await fetch("http://localhost:8080/MegaCity_war_exploded/hello-servlet");
            if (response.ok) {
                setServerStatus("Server is Online");
            } else {
                setServerStatus("Server is Down");
            }
        } catch (error) {
            setServerStatus("Server is Down");
        }
    };

    // Fetch reviews from the API when the component mounts
    useEffect(() => {
        if (!token) return;

        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8080/MegaCity_war_exploded/submitReview', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,  // Attach token in Authorization header
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }

                const data = await response.json();
                setReviews(data);  // Store reviews in the state
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [token]);

    // Calculate average rating from reviews
    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;

        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (totalRating / reviews.length).toFixed(1);
    };

    const stats = [
        { title: "Total Users", value: users, icon: <FaUsers /> },
        { title: "Total Cars", value: cars, icon: <FaCar /> },
        { title: "Booking Rating", value: `${calculateAverageRating()}/5`, icon: <FaStar /> },  // Update value dynamically
    ];

    const internetSpeedAnimation = useSpring({
        opacity: internetSpeed ? 1 : 0.5,
        transform: internetSpeed ? "translateX(0)" : "translateX(-100px)",
        config: { tension: 170, friction: 26 }
    });

    return (
        <Container fluid>
            <Navbar bg="dark" variant="dark" className="justify-content-between px-4">
                <Navbar.Brand>
                    <h4>Megacity Car Service</h4>
                </Navbar.Brand>
                <Nav>
                    <Dropdown className="me-3">
                        <FaTools size={24} />
                        <Link to={"/admin-faq"}>
                            <Button variant="secondary" id="admin-service">
                                Services Report UserManual
                            </Button>
                        </Link>
                    </Dropdown>
                </Nav>
            </Navbar>

            <Row>
                <Col md={3} className="bg-dark text-white p-4" style={{ minHeight: "100vh" }}>
                    <h5 className="fw-bold">Admin Services</h5>
                    <hr />
                    <Link to={'/admin-user'}>
                        <Button variant="light" className="w-100 mb-2">
                            User Management
                        </Button>
                    </Link>

                    <Link to={'/carswithimages'}>
                        <Button variant="light" className="w-100 mb-2">
                            Car Management
                        </Button>
                    </Link>

                    <Link to={'/booking'}>
                        <Button variant="light" className="w-100 mb-2">
                            Booking Management
                        </Button>
                    </Link>
                    <Link to={'/Payments'}>
                        <Button variant="light" className="w-100 mb-2">
                            Payments Management
                        </Button>
                    </Link>
                    <Link to={'/sacnnedQR'}>
                        <Button variant="light" className="w-100 mb-2">
                            Check the QR codes
                        </Button>
                    </Link>
                    <Link to={'/Reviews'}>
                        <Button variant="light" className="w-100 mb-2">
                            Check Reviews
                        </Button>
                    </Link>
                </Col>
                <Col md={9} className="p-4">
                    <Row>
                        {stats.map((stat, index) => (
                            <Col md={4} key={index}>
                                <Card className="text-center p-3 shadow-sm">
                                    <h5>
                                        {stat.icon} {stat.title}
                                    </h5>
                                    <h3>{stat.value}</h3>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Row className="my-4">
                        <Col className="d-flex justify-content-between">
                            <Card className="p-3 text-center">
                                <h6>Website Stress</h6>
                                <ReactSpeedometer
                                    maxValue={100}
                                    value={stress}
                                    needleColor="black"
                                    startColor="green"
                                    endColor="red"
                                    segments={10}
                                    needleTransitionDuration={1500}
                                    needleTransition="easeElastic"
                                    height={180}
                                    width={250}
                                    currentValueText={`Stress Level: ${stress.toFixed(2)}%`}
                                />
                            </Card>
                            <Card className="p-3 text-center">
                                <h6>Performance</h6>
                                <ReactSpeedometer
                                    maxValue={1000}
                                    value={performance}
                                    needleColor="red"
                                    startColor="yellow"
                                    endColor="red"
                                    segments={10}
                                    needleTransitionDuration={1500}
                                    needleTransition="easeElastic"
                                    height={180}
                                    width={250}
                                    currentValueText={`Load Time: ${performance}ms`}
                                />
                            </Card>
                            <Card className="p-3 text-center">
                                <h6>Data Volume</h6>
                                <ReactSpeedometer
                                    maxValue={1000}
                                    value={dataVolume}
                                    needleColor="blue"
                                    startColor="yellow"
                                    endColor="blue"
                                    segments={10}
                                    needleTransitionDuration={1500}
                                    needleTransition="easeElastic"
                                    height={180}
                                    width={250}
                                    currentValueText={`Data Volume: ${dataVolume.toFixed(2)} MB`}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Card className="p-3 text-center">
                                <h6>Internet Speed</h6>
                                <animated.div style={internetSpeedAnimation}>
                                    {internetSpeed ? `Speed: ${internetSpeed}` : "Calculating..."}
                                </animated.div>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="p-3 text-center">
                                <h6>Backend Server Status</h6>
                                <div>
                                    {serverStatus === "Checking..." ? (
                                        <ClipLoader size={30} color={"#00bfff"} loading={true} />
                                    ) : (
                                        <FaServer color={serverStatus === "Server is Online" ? "green" : "red"} size={40} />
                                    )}
                                    <p>{serverStatus}</p>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    {/*<Row>*/}
                    {/*    <Col>*/}
                    {/*        <Card className="p-3">*/}
                    {/*            <h5>Booking Trends</h5>*/}
                    {/*            <Chart*/}
                    {/*                options={{*/}
                    {/*                    chart: { id: "basic-bar" },*/}
                    {/*                    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },*/}
                    {/*                }}*/}
                    {/*                series={[{ name: "Bookings", data: [30, 40, 45, 50, 49] }]}*/}
                    {/*                type="bar"*/}
                    {/*                height={250}*/}
                    {/*            />*/}
                    {/*        </Card>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;
