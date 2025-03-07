import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import DriverAssignBooking from "./DriverAssignBooking.jsx";

const DriverDash = () => {
    const chartData = {
        labels: ['Cars Serviced', 'Users', 'Total Services'],
        datasets: [
            {
                label: 'Counts',
                data: [50, 120, 200], // Replace with actual data
                backgroundColor: ['#007bff', '#28a745', '#ffc107'],
            },
        ],
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Left Sidebar */}
                <nav className="col-md-2 bg-dark text-white p-3 min-vh-100">
                    <h4>Driver Admin</h4>
                    <button>
                        <Link to={'/assinBooking'}>
                            DriverAssignBooking
                        </Link>
                    </button>

                </nav>

                {/* Main Content */}
                <main className="col-md-10 p-4">
                    <div className="row">
                        {/* Left Top Section */}
                        <div className="col-md-4">
                            <h2>Dashboard Overview</h2>
                            <h5 className="text-muted">Your Statistics</h5>
                        </div>

                        {/* Right Side Charts */}
                        <div className="col-md-8">
                            <div className="card p-3">
                                <h5>Service Statistics</h5>
                                <Bar data={chartData} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DriverDash;
