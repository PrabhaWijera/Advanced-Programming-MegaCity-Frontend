import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import './Login.css';
import imageLogin from "../../assets/all-images/slider-img/slider-6.jpg"

const Login = () => {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log(userData); // For debugging

        try {
            const response = await axios.post(
                "http://localhost:8080/MegaCity_war_exploded/login",
                new URLSearchParams({
                    email: userData.email,
                    password: userData.password,
                }),
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    withCredentials: true,
                }
            );

            // Check the response from the backend
            if (response.data.token) {
                console.log("Login successful, token:", response.data.token); // Debugging

                // Save the JWT token to localStorage
                localStorage.setItem("token", response.data.token);
                const token = response.data.token;
                const decodedToken = decodeJWT(token); // Decoding the token

                // Assuming the role is in the decoded payload
                const userRole = decodedToken.role;

                // Navigate based on user role
                if (userRole === "admin") {
                    navigate("/admin"); // Admin dashboard
                } else if (userRole === "driver") {
                    navigate("/driver"); // Driver dashboard
                } else if (userRole === "customer") {
                    navigate("/"); // Customer dashboard
                } else {
                    setError("Invalid role.");
                }
            } else {
                setError("Unexpected response. No token received.");

            }
        } catch (error) {
            console.error("Error during login:", error.response?.data?.error || error.message);
            setError(error.response?.data?.error || "Invalid login credentials. Please try again.");
        }
    };
    // Function to decode JWT manually
    const decodeJWT = (token) => {
        const base64Url = token.split('.')[1]; // Get the payload part of the token
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert URL-safe base64 to standard base64
        const decodedData = JSON.parse(atob(base64)); // Decode base64 and parse JSON
        return decodedData;
    };

    return (
        <div className="container  mt-5 mb-5">
            <div className="card shadow-lg p-4 d-flex flex-row" style={{ width: "auto" }}>
                <div className="w-50">
                    <img
                        src={imageLogin}
                        alt="Login Illustration"
                        className="img-fluid rounded-start"
                    />
                </div>
                <div className="w-50 p-4">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={userData.password}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                required
                            />
                        </div>
                        {error && <p className="text-danger text-center">{error}</p>}
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <input type="checkbox" id="rememberMe" />
                                <label htmlFor="rememberMe" className="ms-2">Remember Me</label>
                            </div>
                            <a href="#" className="text-decoration-none">Forgot password?</a>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    <p className="text-center mt-3">
                        Don't have an account? <a href="#" className="text-primary"></a>
                        <Link to={'/register'}>
                            Register
                        </Link>

                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
