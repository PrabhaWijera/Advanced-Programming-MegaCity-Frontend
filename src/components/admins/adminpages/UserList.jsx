import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import ToastNotification, {showToast} from "../../UI/ToastNotification.jsx";
import {validateUserData} from "../../../context/RegisterValidations.jsx";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [editUser, setEditUser] = useState(null); // State for the user being edited
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        role: "customer",
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Register new user
    const handleRegister = async (event) => {
        event.preventDefault();
        if (!validateUserData(userData, showToast)) return;
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
            console.log(response.data.message);
            // Reset form after successful registration
            setUserData({
                username: "",
                email: "",
                phone: "",
                password: "",
                role: "customer"
            });
            if(response.status === 201 || response.status === 200) {
                showToast(200, "User Create is successfully! ✅");
            }
        } catch (error) {
            showToast(500, "Error: Something went wrong! ❌");
            console.error("Error during registration:", error.response?.data?.error || "Unknown error");
        }
    };

    // Fetch all users initially
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/MegaCity_war_exploded/users");
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Handle role filter
    const handleRoleFilter = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:8080/MegaCity_war_exploded/users/filter?role=${selectedRole}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsers(response.data);
        } catch (error) {
            console.error("Error filtering users by role:", error);
            showToast(500, "Error: Something went wrong! ❌");
        } finally {
            setLoading(false);
        }
    };

    // Handle email search
    const handleSearch = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:8080/MegaCity_war_exploded/users/search?email=${searchEmail}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsers(response.data);
        } catch (error) {
            console.error("Error searching user by email:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle delete user
    const handleDeleteUser = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        try {
            const response = await axios.delete(
                `http://localhost:8080/MegaCity_war_exploded/users/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                setUsers(users.filter(user => user.id !== id)); // Update the UI
                showToast(200, "User Delete  is successfully! ✅");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            showToast(500, "Error: Something went wrong! ❌");
        }
    };

    // Handle update user
    const handleUpdateUser = async () => {
        if (!userData.username || !userData.password) {
            alert("Username and Password are required!");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/MegaCity_war_exploded/users/${editUser.id}`,
                userData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("User updated:", response.data);

            // Update users state directly without useEffect
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === editUser.id ? response.data : user
                )
            );

            // Reset form and close the edit mode
            setEditUser(null); // Close the update form
            setUserData({
                username: "",
                email: "",
                phone: "",
                password: "",
                role: "customer"
            });
            if (response.status === 200) {
                showToast(200, "User Update  is successfully! ✅");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            showToast(500, "Error: Something went wrong! ❌");
        }
    };

    // Show loading message if data is still being fetched
    if (loading) return <p className="text-center">Loading...</p>;

    // Set updatedUserData to current user's details when editing
    const handleEditUser = (user) => {
        setEditUser(user);
        setUserData({
            username: user.username,
            email: user.email,
            phone: user.phone,
            password: "", // Optional, leave empty for editing password
            role: user.role
        });
    };

    return (
        <div className="container mt-5">
            <ToastNotification />
            <Link to={'/admin'} className='mb-4'>
                <Button variant="outline-dark" >
                    🔙
                </Button>
            </Link>
            {/* Register New User */}
            <div className="mb-4">
                <h2>Register New User</h2>
                <form onSubmit={handleRegister}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Username"
                                value={userData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                placeholder="Phone"
                                value={userData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                value={userData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <select
                                className="form-select"
                                name="role"
                                value={userData.role}
                                onChange={handleChange}
                            >
                                <option value="admin">Admin</option>
                                <option value="driver">Driver</option>
                                <option value="customer">Customer</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <button type="submit" className="btn btn-primary w-100">Register User</button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Search by email */}
            <div className="mb-4">
                <div className="row">
                    <div className="col-md-8 mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Search by email"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <button onClick={handleSearch} className="btn btn-info w-100">Search</button>
                    </div>
                </div>
            </div>

            {/* Filter by role */}
            <div className=" mb-3">
                <div className="row">
                    <div className="col-md-8 mb-3">
                        <select
                            className="form-select"
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="driver">Driver</option>
                            <option value="customer">Customer</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <button onClick={handleRoleFilter} className="btn btn-warning w-100">Filter</button>
                    </div>
                </div>
            </div>

            {/* User List */}
            <div className="mb-4">
                <h2>User List</h2>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger btn-sm">Delete</button>
                                    <button onClick={() => handleEditUser(user)} className="btn btn-primary btn-sm ms-2">Update</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No users found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Edit User Form */}
            {editUser && (
                <div className="mb-5">
                    <h2>Edit User</h2>
                    <form onSubmit={handleUpdateUser}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    placeholder="Username"
                                    value={userData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                    value={userData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    placeholder="Phone"
                                    value={userData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={userData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <select
                                    className="form-select"
                                    name="role"
                                    value={userData.role}
                                    onChange={handleChange}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="driver">Driver</option>
                                    <option value="customer">Customer</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <button type="submit" className="btn btn-success w-100">Save Changes</button>
                            </div>
                            <div className="col-md-4">
                                <button type="button" onClick={() => setEditUser(null)} className="btn btn-secondary w-100">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>

    );
};

export default UserList;
