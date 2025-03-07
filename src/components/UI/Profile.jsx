import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

function UserProfile() {
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const [statusCode, setStatusCode] = useState(null);
    const [message, setMessage] = useState('');

    // Fetch user profile details when the component mounts
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found');
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/MegaCity_war_exploded/profile', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                    setStatusCode(response.status);
                    setMessage(response.message);
                    // Fetch user's profile image after fetching the profile data
                    fetchProfileImage(data.email);  // Pass the user's email to fetch their profile image
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || 'Failed to fetch user data');
                    setStatusCode(response.status);
                    setMessage(response.message);
                }
            } catch (err) {
                setError('Error fetching user data');
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    // Fetch the user's profile image from the server using their email
    const fetchProfileImage = async (email) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No authentication token found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/MegaCity_war_exploded/googleUploadImage?email=${email}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const imageUrl = await response.json();
                setImageUrl(imageUrl);  // Set the profile image URL returned by the backend
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to fetch profile image');
            }
        } catch (err) {
            setError('Error fetching profile image');
            console.error(err);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            setError('');

            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found');
                return;
            }

            const response = await fetch('http://localhost:8080/MegaCity_war_exploded/googleUploadImage', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image.');
            }

            const uploadedImageUrl = await response.text();
            setImageUrl(uploadedImageUrl);  // Update profile image URL after upload

            // Reset preview URL and clear file input
            setPreviewUrl('');
        } catch (err) {
            setError('Error uploading image: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        // Clear the token from localStorage (or sessionStorage)
        localStorage.removeItem('token');

        // Redirect the user to the login page or home
        navigate('/login');
    };

    return (
        <div className="container mt-5 mb-5 ">

            {error && <div className="alert alert-danger">{error}</div>}

            {user ? (
                <div className="card shadow-sm">
                    <div className="card-body">
                        {imageUrl ? (
                            <div className="text-center">

                                <img src={imageUrl} alt="Profile" className="img-fluid rounded-circle" width="150"
                                     height="150"/>
                            </div>
                        ) : (
                            <div className="text-center text-muted">
                                <p>No profile image found.</p>
                            </div>
                        )}
                        <div className="text-center">

                            <p className="card-text text-muted">Email: {user.email}</p>

                                <Button onClick={handleLogout}>Logout</Button>

                        </div>

                        <div className="mt-4">

                            <p className="text-center text-muted">Please rename the user profile image before saving to
                                the server using your email address.</p>
                            <div className="d-flex justify-content-center">
                                <input type="file" accept="image/*" className="form-control-file"
                                       onChange={handleFileChange}/>
                            </div>

                            {previewUrl && (
                                <div className="text-center mt-3">
                                    <img src={previewUrl} alt="Preview" className="img-fluid rounded" width="150"
                                         height="150"/>
                                </div>
                            )}

                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleUpload}
                                    disabled={loading}>
                                    {loading ? 'Uploading...' : 'Upload Image'}
                                </button>


                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p>Loading profile...</p>
                </div>
            )}
        </div>

    );
}

export default UserProfile;
