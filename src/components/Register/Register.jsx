import React, { useState } from "react";
import axios from "axios";
import './Register.css';
import ToastNotification, {showToast} from "../UI/ToastNotification.jsx";
const Register = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        role: "Customer",
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };


    const handleRegister = async (event) => {
        event.preventDefault();
        console.log(userData);
        try {
            const response = await axios.post("http://localhost:8080/MegaCity_war_exploded/register",
                new URLSearchParams({
                    username: userData.username,
                    password: userData.password,
                    email: userData.email,
                    phone: userData.phone,
                    role: userData.role
                }),
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    withCredentials: true
                }
            );
            console.log(URLSearchParams);
            console.log(response.data.message);
            if(response.status === 201 || response.status === 200) {
                showToast(200, "Book is successfully! ✅");
            }
        } catch (error) {
            showToast(500, "Error: Something went wrong! ❌");
            console.error("Error during registration:", error.response?.data?.error || "Unknown error");
        }
    };




    return (
        <div className="container vh-80 bg-light mt-5 mb-5 " >
            <ToastNotification />
            <div className="row justify-content-center" >
                <div className="col-lg-6 col-md-8 col-12">
                    <div className="card shadow-lg border-0">
                        <div className="row g-0">
                            {/* Form Section */}
                            <div className="col-md-6 d-flex align-items-center justify-content-center">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpWb5M0JkMTFGQd0LpXMOduNUYfIhEfx_sWA&s/400x500"
                                    alt="Register Illustration"
                                    className="img-fluid rounded-start"
                                />
                            </div>

                            {/* Form Container */}
                            <div className="col-md-6 p-4">
                                <h2 className="text-center mb-4">Register</h2>
                                <form onSubmit={handleRegister}>
                                    {/* Username Input */}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="username"
                                            value={userData.username}
                                            onChange={handleChange}
                                            placeholder="Username"
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    {/* Email Input */}
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            name="email"
                                            value={userData.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    {/* Password Input */}
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            name="password"
                                            value={userData.password}
                                            onChange={handleChange}
                                            placeholder="Password"
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    {/* Phone Input */}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="phone"
                                            value={userData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone"
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" className="btn btn-primary w-100 mb-3">
                                        Register
                                    </button>

                                    {/* Auth Links */}
                                    <div className="d-flex justify-content-between">

                                        <a href="/login" className="text-muted">Login</a>
                                        <button className="btn btn-danger btn-sm">
                                            Sign up with Google
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
