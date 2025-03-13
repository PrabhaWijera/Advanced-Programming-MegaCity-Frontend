import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function UserProfile() {
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [review, setReview] = useState(''); // Track the review text
    const [rating, setRating] = useState(0);  // Track the rating (1-5 stars)
    const navigate = useNavigate();

    const [statusCode, setStatusCode] = useState(null);
    const [message, setMessage] = useState('');
    const[UserId,setUserId]=useState(null);


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
                    setUserId(data.id);
                    console.log(data.id);
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
    useEffect(() => {
        if (UserId !== null) {
            localStorage.setItem('UserId', UserId);
        }
    }, [UserId]);
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

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleRatingChange = (ratingValue) => {
        setRating(ratingValue); // Update the rating when a star is clicked
    };

    const handleReviewSubmit = async () => {
        if (!review || rating === 0) {
            setError('Please enter a review and select a rating');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('No authentication token found');
            return;
        }

        // Ensure that the user object is available before submitting the review
        if (!user) {
            setError('User data is not available');
            return;
        }

        try {
            setLoading(true);
            setError('');

            // Create the data object to send to the server
            const reviewData = {
                reviewText: review,  // Review text (make sure to use reviewText to match DTO field)
                rating: rating,      // Rating (1-5 stars)
                email: user.email,   // User's email
                userId: user.id,     // User's ID (ensure this is an integer, it should be a number)
            };

            const response = await fetch('http://localhost:8080/MegaCity_war_exploded/submitReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(reviewData),  // Ensure the reviewData is passed as a JSON string
            });


            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            setReview('');  // Clear the review input
            setRating(0);   // Reset the rating to 0
            setMessage('Review submitted successfully!');
        } catch (err) {
            setError('Error submitting review: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 mb-5 ">

            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

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
                            <p className="text-center text-muted">Please rename the user profile image before saving to the server using your email address.</p>
                            <div className="d-flex justify-content-center">
                                <input type="file" accept="image/*" className="form-control-file" onChange={handleFileChange}/>
                            </div>

                            {previewUrl && (
                                <div className="text-center mt-3">
                                    <img src={previewUrl} alt="Preview" className="img-fluid rounded" width="150"
                                         height="150"/>
                                </div>
                            )}

                            <div className="text-center mt-4">
                                <button className="btn btn-primary" onClick={handleUpload} disabled={loading}>
                                    {loading ? 'Uploading...' : 'Upload Image'}
                                </button>
                            </div>

                            {/* Review Section */}
                            {/* Review Section */}
                            <div className="mt-4">
                                <h5 className="text-center">Add a Review</h5>

                                {/* Rating System */}
                                <div className="text-center">
        <span
            className={`star ${rating >= 1 ? 'text-warning' : 'text-muted'}`}
            onClick={() => handleRatingChange(1)}
            style={{ cursor: 'pointer', fontSize: '1.5rem' }}
        >
            &#9733;
        </span>
                                    <span
                                        className={`star ${rating >= 2 ? 'text-warning' : 'text-muted'}`}
                                        onClick={() => handleRatingChange(2)}
                                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                    >
            &#9733;
        </span>
                                    <span
                                        className={`star ${rating >= 3 ? 'text-warning' : 'text-muted'}`}
                                        onClick={() => handleRatingChange(3)}
                                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                    >
            &#9733;
        </span>
                                    <span
                                        className={`star ${rating >= 4 ? 'text-warning' : 'text-muted'}`}
                                        onClick={() => handleRatingChange(4)}
                                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                    >
            &#9733;
        </span>
                                    <span
                                        className={`star ${rating >= 5 ? 'text-warning' : 'text-muted'}`}
                                        onClick={() => handleRatingChange(5)}
                                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                    >
            &#9733;
        </span>
                                </div>

                                {/* Review Text */}
                                <Form>
                                    <Form.Group controlId="review">
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={review}
                                            onChange={handleReviewChange}
                                            placeholder="Write your review here..."
                                            className="mt-3"
                                        />
                                    </Form.Group>
                                    <Button
                                        className="mt-2 w-100"
                                        onClick={handleReviewSubmit}
                                        disabled={loading}
                                    >
                                        {loading ? 'Submitting...' : 'Submit Review'}
                                    </Button>
                                </Form>
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
