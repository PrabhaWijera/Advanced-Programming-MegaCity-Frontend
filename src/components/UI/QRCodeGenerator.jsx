import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ data, onDownload }) => {
    const handleDownload = () => {
        const canvas = document.querySelector("canvas"); // Select the canvas element that the QRCode renders to
        if (canvas) {
            const imageURL = canvas.toDataURL("image/png"); // Get the image as a data URL
            onDownload(imageURL); // Trigger the download action
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h2 className="mb-4">Generated QR Code</h2>

            {/* Generate QR Code with the received data */}
            <div className="mb-4">
                <QRCode value={data} size={256} fgColor="black" bgColor="white" />
            </div>

            {/* Download Button */}
            <button
                onClick={handleDownload}
                className="btn btn-primary btn-lg mt-3"
            >
                Download QR Code
            </button>
        </div>
    );
};

export default QRCodeGenerator;
