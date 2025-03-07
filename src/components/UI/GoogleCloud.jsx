import React, { useState, useEffect } from 'react';

const GoogleCloud = () => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [allImages, setAllImages] = useState([]); // State for all images
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    // Handle file change and preview
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setError('');
            const preview = URL.createObjectURL(selectedFile);
            setPreviewUrl(preview);
        } else {
            setError('Please upload a valid image file.');
            setPreviewUrl('');
        }
    };

    // Handle upload to the backend
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

            const response = await fetch('http://localhost:8080/MegaCity_war_exploded/googleUploadImage', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image.');
            }

            const uploadedImageUrl = await response.text();
            setImageUrl(uploadedImageUrl);

            // After upload, reset the preview URL
            setPreviewUrl('');

            // Fetch all images
            fetchAllImages();
        } catch (err) {
            setError('Error uploading image: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch all uploaded images when the component mounts or after upload
    const fetchAllImages = async () => {
        try {
            const response = await fetch('http://localhost:8080/MegaCity_war_exploded/googleUploadImage');  // Ensure this endpoint returns an array of image URLs
            if (!response.ok) {
                throw new Error('Failed to fetch images.');
            }

            const images = await response.json();
            console.log("Fetched images:", images);  // Debugging: log the fetched URLs
            setAllImages(images);  // Assuming the response is a list of image URLs
        } catch (err) {
            setError('Error fetching images: ' + err.message);
        }
    };

    useEffect(() => {
        fetchAllImages();
    }, []);  // Fetch images once when component mounts

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Image'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {previewUrl && !loading && (
                <div>
                    <h3>Image Preview:</h3>
                    <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px', height: 'auto' }} />
                </div>
            )}

            {imageUrl && (
                <div>
                    <h3>Uploaded Image:</h3>
                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            )}

            <div>
                <h3>All Images:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {allImages.length === 0 ? (
                        <p>No images found.</p>
                    ) : (
                        allImages.map((image, index) => (
                            <div key={index} style={{ margin: '10px' }}>
                                {/* Debugging: Checking if URL is valid */}
                                <img
                                    src={image}
                                    alt={`Uploaded Image ${index + 1}`}
                                    style={{ maxWidth: '200px', height: 'auto', margin: '5px', border: '1px solid #ddd' }}
                                />
                                <p>{image}</p> {/* Show URL for debugging */}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default GoogleCloud;
