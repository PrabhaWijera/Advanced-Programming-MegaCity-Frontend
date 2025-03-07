import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the token from localStorage (or sessionStorage)
        localStorage.removeItem('token');

        // Redirect the user to the login page or home
        navigate('/login');
    };

    return (
        <div>
            <h2>You are logged in</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
