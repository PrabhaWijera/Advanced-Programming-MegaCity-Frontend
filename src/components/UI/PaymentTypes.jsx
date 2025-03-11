import React from "react";

const PaymentTypes = () => {
    const paymentMethods = [
        { name: "Visa", src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" },
        { name: "MasterCard", src: "https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" },
        { name: "PayPal", src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
        { name: "American Express", src: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" }
    ];

    return (
        <div className="container text-center mt-4">
            <h5>Accepted Payment Methods</h5>
            <div className="d-flex justify-content-center gap-5 flex-wrap">
                {paymentMethods.map((method) => (
                    <img
                        key={method.name}
                        src={method.src}
                        alt={method.name}
                        className="img-fluid"
                        style={{ width: "60px" }}
                    />
                ))}
            </div>
        </div>
    );
};

export default PaymentTypes;
