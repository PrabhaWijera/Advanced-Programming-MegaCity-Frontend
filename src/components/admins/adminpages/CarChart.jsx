import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import Modal from 'react-modal';
import { Button, Form, Modal as BSModal, Container, Row, Col } from 'react-bootstrap';

// Set Modal accessibility
Modal.setAppElement('#root');

const CarChart = () => {
    const [carData, setCarData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Filter options state
    const [filters, setFilters] = useState({
        carModel: 'all',
        carStatus: 'all',
    });

    // Dropdown options state
    const [carModels, setCarModels] = useState([]);
    const [carStatuses, setCarStatuses] = useState([]);

    // Fetch car data and filter options
    useEffect(() => {
        // Fetch car data
        fetch('http://localhost:8080/MegaCity_war_exploded/filteringUserCars')
            .then((response) => response.json())
            .then((data) => {
                setCarData(data);
                setFilteredData(data); // Set filtered data initially to all data
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching car data:', error);
                setLoading(false);
            });

        // Fetch filter options (Car Models and Car Statuses)
        fetch('http://localhost:8080/MegaCity_war_exploded/getCarFilterOptions') // URL to fetch filter options
            .then((response) => response.json())
            .then((data) => {
                const models = data.carModels || []; // Dynamic car models from backend
                const statuses = data.carStatuses || []; // Dynamic car statuses from backend
                setCarModels(models); // Set car models dynamically
                setCarStatuses(statuses); // Set car statuses dynamically
            })
            .catch((error) => {
                console.error('Error fetching filter options:', error);
            });
    }, []);

    // Apply filter function
    const applyFilters = () => {
        let filtered = [...carData];

        // Car Model filter
        if (filters.carModel !== 'all') {
            filtered = filtered.filter((car) => car.model === filters.carModel);
        }

        // Car Status filter
        if (filters.carStatus !== 'all') {
            filtered = filtered.filter((car) => car.status === filters.carStatus);
        }

        setFilteredData(filtered);
    };

    // Vehicle count chart (shows the total number of vehicles initially)
    const vehicleCountChartData = {
        labels: ['Total Vehicles'],
        datasets: [
            {
                label: 'Number of Vehicles',
                data: [carData.length],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart.js data for the Bar chart (filtered data)
    const chartData = {
        labels: filteredData.map((car) => car.model), // car model as labels
        datasets: [
            {
                label: 'Car Count',
                data: filteredData.map(() => 1), // just counting each car
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Container>
            <h1 className="mt-4">Car Data Visualization</h1>

            {/* Initial Vehicle Count Chart */}
            <h2>Total Vehicle Count</h2>
            <Bar data={vehicleCountChartData} />

            {/* Button to open filter modal */}
            <Button variant="primary" className="my-4" onClick={() => setModalIsOpen(true)}>
                Filter Cars
            </Button>

            {/* Modal for filter options */}
            <BSModal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
                <BSModal.Header closeButton>
                    <BSModal.Title>Filter Options</BSModal.Title>
                </BSModal.Header>
                <BSModal.Body>
                    <Form>
                        {/* Car Model Filter (Dropdown from dynamically fetched data) */}
                        <Form.Group controlId="carModel">
                            <Form.Label>Car Model</Form.Label>
                            <Form.Control
                                as="select"
                                value={filters.carModel}
                                onChange={(e) => setFilters({ ...filters, carModel: e.target.value })}
                            >
                                <option value="all">All</option>
                                {carModels.map((model, index) => (
                                    <option key={index} value={model}>
                                        {model}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        {/* Car Status Filter (Dropdown from dynamically fetched data) */}
                        <Form.Group controlId="carStatus">
                            <Form.Label>Car Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={filters.carStatus}
                                onChange={(e) => setFilters({ ...filters, carStatus: e.target.value })}
                            >
                                <option value="all">All</option>
                                {carStatuses.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </BSModal.Body>
                <BSModal.Footer>
                    <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={applyFilters}>
                        Apply Filters
                    </Button>
                </BSModal.Footer>
            </BSModal>

            {/* Display the filtered chart */}
            <h2 className="mt-4">Filtered Vehicle Count</h2>
            <Bar data={chartData} />
        </Container>
    );
};

export default CarChart;
