import React from 'react';

import {Link} from "react-router-dom";
import DriverAssignBooking from "./DriverAssignBooking.jsx";
import {Button} from "reactstrap";

const DriverDash = () => {


    return (
        <div className="container-fluid">
            <div className="row">
                {/* Left Sidebar */}
                <nav className="col-md-2 bg-dark text-white p-3 min-vh-100">
                    <h4>Driver Services</h4>
                    <Link to={'/assinBooking'}>
                        <Button variant="light" className="w-100 mb-2">
                            DriverAssignBooking
                        </Button>
                    </Link>
                </nav>


                {/* Main Content */}
                <main className="col-md-10 p-4">
                    <div className="row">
                        {/* Left Top Section */}
                        <div className="col-md-4">
                            <h2>Dashboard Overview</h2>
                            <h5 className="text-muted">Your Statistics</h5>
                        </div>


                    </div>
                </main>
            </div>
        </div>
    );
};

export default DriverDash;
