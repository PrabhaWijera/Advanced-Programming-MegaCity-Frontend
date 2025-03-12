import React, { useState, useEffect } from 'react';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);  // Store reviews data
    const [loading, setLoading] = useState(true); // Manage loading state
    const [error, setError] = useState('');  // Store error messages
    const [message, setMessage] = useState(''); // Success message

    // Check if token is present
    const token = localStorage.getItem('token');
    if (!token) {
        setError('No authentication token found');
    }

    // API URL for fetching all reviews
    const apiUrl = 'http://localhost:8080/MegaCity_war_exploded/submitReview'; // Update to the correct endpoint

    // Fetch all reviews when component mounts
    useEffect(() => {
        if (!token) return; // Exit early if no token found

        const fetchReviews = async () => {
            try {
                setLoading(true); // Set loading state to true before the fetch
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,  // Attach token in Authorization header
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }

                const data = await response.json();
                setReviews(data);  // Store reviews in the state
            } catch (error) {
                setError(error.message); // If an error occurs, set the error state
            } finally {
                setLoading(false);  // Set loading state to false after request
            }
        };

        fetchReviews();
    }, [token, apiUrl]);

    // Handle loading and error states
    if (loading) {
        return <div className="text-center">Loading reviews...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    // Function to render stars based on rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<span key={i} className="star text-warning">★</span>);  // Filled star for rating
            } else {
                stars.push(<span key={i} className="star text-muted">★</span>);  // Empty star for non-rated points
            }
        }
        return stars;
    };

    // Render reviews if they exist
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Customer Reviews</h1>

            {/* Display success message if available */}
            {message && <div className="alert alert-success">{message}</div>}

            {/* Reviews List */}
            <div className="list-group mb-5">
                {reviews.length === 0 ? (
                    <div className="list-group-item">No reviews available.</div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="list-group-item">
                            <h5 className="mb-1">{review.customerName}</h5>
                            <p className="text-muted">{review.email}</p>
                            <p className="mb-1">{review.reviewText}</p>
                            <p className="mb-1">
                                <strong>Rating:</strong> {renderStars(review.rating)} {/* Render the stars */}
                            </p>
                            <p className="text-muted">
                                <strong>User ID:</strong> {review.userId}
                                {/*<strong> Review Date:</strong> {new Date(review.date).toLocaleDateString()}*/}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Reviews;
