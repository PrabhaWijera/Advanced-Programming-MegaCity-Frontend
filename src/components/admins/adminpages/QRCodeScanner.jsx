import React, { useState } from 'react';
import jsQR from 'jsqr';

const QRCodeScanner = () => {
    const [qrData, setQrData] = useState(null); // State to store the decoded QR code data as an object
    const [image, setImage] = useState(null); // State to store the uploaded image

    // Function to handle the file upload and scan the QR code
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    scanQRCode(img);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to scan the QR code from the uploaded image
    const scanQRCode = (img) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Get the image data from the canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Decode the QR code from the image data
        const decoded = jsQR(imageData.data, canvas.width, canvas.height);

        if (decoded) {
            // Assuming the QR code data is in JSON format, parse it into an object
            try {
                const parsedData = JSON.parse(decoded.data);
                setQrData(parsedData); // Set the parsed data from the QR code
            } catch (error) {
                setQrData({ error: "Invalid QR code format" });
            }
        } else {
            setQrData({ error: "No QR code found." });
        }
    };

    return (
        <div className="container mt-5 ">
            <h2 className="mb-4">Upload a QR Code  to Scan</h2>
            <div className="d-flex flex-column align-items-center mb-lg-3">
                <label htmlFor="fileUpload" className="btn btn-primary btn-lg mb-3 mt-3">
                    Upload Image
                </label>
                <input
                    type="file"
                    id="fileUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="d-none" // Hide the default file input
                />
                <button
                    className="btn btn-primary btn-lg mt-3"
                    style={{ backgroundColor: qrData ? "#007bff" : "" }}
                    disabled={qrData ? true : false}
                >
                    Upload
                </button>
            </div>

            {qrData && !qrData.error && (
                <div className="mt-5">
                    <h3>Scanned QR Code Data:</h3>
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>Data Field</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Booking ID</td>
                            <td>{qrData.bookingId}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>{qrData.userId}</td>
                        </tr>
                        <tr>
                            <td>Payment Amount</td>
                            <td>{qrData.paymentAmount}</td>
                        </tr>
                        <tr>
                            <td>Currency</td>
                            <td>{qrData.currency}</td>
                        </tr>
                        <tr>
                            <td>Payment Method</td>
                            <td>{qrData.paymentMethod}</td>
                        </tr>
                        <tr>
                            <td>Payment Status</td>
                            <td>{qrData.paymentStatus}</td>
                        </tr>
                        <tr>
                            <td>Transaction ID</td>
                            <td>{qrData.transactionId}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Show error or no QR code found */}
            {qrData && qrData.error && (
                <div className="alert alert-danger mt-4">
                    <strong>Error:</strong> {qrData.error}
                </div>
            )}
        </div>
    );
};

export default QRCodeScanner;
