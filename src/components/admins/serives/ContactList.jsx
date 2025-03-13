import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure Bootstrap CSS is imported

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch contact data when the component mounts
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch("http://localhost:8080/MegaCity_war_exploded/contact"); // Change to your API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch contacts");
                }

                const data = await response.json();
                setContacts(data); // Assuming the API returns an array of contact objects
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    if (loading) {
        return <div className="text-center">Loading contacts...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Contact Details</h2>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contacts.length > 0 ? (
                        contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.message}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No contacts available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactList;
