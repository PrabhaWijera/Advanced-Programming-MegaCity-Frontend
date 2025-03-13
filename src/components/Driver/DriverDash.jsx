import React from 'react';

import {Link} from "react-router-dom";
import DriverAssignBooking from "./DriverAssignBooking.jsx";
import {Button} from "reactstrap";
import driver from "../../assets/all-images/slider-img/slider-4.jpg"
const DriverDash = () => {


    return (
        <div className="container-fluid">
            <div className="row">
                {/* Left Sidebar */}
                <nav className="col-md-2 bg-dark text-white p-3 min-vh-100">
                    <h4>Driver Services</h4>
                    <Link to={'/assinBooking'}>
                        <Button variant="light" className="w-100 mb-2">
                           Assigned Rides
                        </Button>
                    </Link>
                </nav>


                {/* Main Content */}
                <main className="col-md-10 p-4">
                    <div className="row">
                        {/* Left Top Section */}
                        <div className="col-md-4">
                            <h2>Dashboard Overview</h2>
                            <img src={driver} alt=""/>
                        </div>


                    </div>
                </main>
            </div>
        </div>
    );
};

export default DriverDash;
