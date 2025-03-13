import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet.jsx";
import CommonSection from "../components/UI/CommonSection";
import ToastNotification, { showToast } from "../../src/components/UI/ToastNotification.jsx";
import "../styles/contact.css";
import { validateName, validateEmail, validateMessage } from "../context/validationContact.jsx";

const Contact = () => {
  const [statusCode, setStatusCode] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState({}); // Initialize user as an empty object
  const [UserId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    user_id: '', // Initially set as an empty string
    name: "",
    email: "",
    message: "",
  });

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
          setUser(data); // Set the user data
          setUserId(data.id);

          // Update formData with the fetched user ID
          setFormData((prevFormData) => ({
            ...prevFormData,
            user_id: data.id || '1', // Update user_id in formData
          }));

          setStatusCode(response.status);
          setMessage(response.message);
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

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const formErrors = {};
    let isValid = true;

    if (!validateName(formData.name)) {
      formErrors.name = "Name must be at least 3 characters long.";
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!validateMessage(formData.message)) {
      formErrors.message = "Message must be at least 10 characters long.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/MegaCity_war_exploded/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast(200, "Message sent successfully! ✅");
        // Reset form data after success
        setFormData({ user_id: "", name: "", email: "", message: "" });
      } else {
        const result = await response.json();
        showToast(400, result.error || "Error sending message.");
      }
    } catch (error) {
      showToast(500, "Error: Something went wrong! ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <Helmet title="Contact">
        <CommonSection title="Contact" />
        <section>
          <ToastNotification />
          <Container>
            <Row>
              <Col lg="7" md="7">
                <h6 className="fw-bold mb-4">Get In Touch</h6>

                <form onSubmit={handleSubmit}>
                  <FormGroup className="contact__form">
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        type="text"
                        required
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                  </FormGroup>

                  <FormGroup className="contact__form">
                    <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                  </FormGroup>

                  <FormGroup className="contact__form">
                  <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Message"
                      className="textarea"
                      required
                  ></textarea>
                    {errors.message && <p className="error-text">{errors.message}</p>}
                  </FormGroup>

                  <button className="contact__btn" type="submit" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </Col>

              <Col lg="5" md="5">
                <div className="contact__info">
                  <h6 className="fw-bold">Contact Information</h6>
                  <p className="section__description mb-0">Colombo City, Western Sri Lanka</p>

                  <div className="d-flex align-items-center gap-2">
                    <h6 className="fs-6 mb-0">Phone:</h6>
                    <p className="section__description mb-0">+94 760368019</p>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <h6 className="mb-0 fs-6">Email:</h6>
                    <p className="section__description mb-0">megaCitySri@gmail.com</p>
                  </div>

                  <h6 className="fw-bold mt-4">Follow Us</h6>
                  <div className="d-flex align-items-center gap-4 mt-3">
                    <a href="#" className="social__link-icon"><i className="ri-facebook-line"></i></a>
                    <a href="#" className="social__link-icon"><i className="ri-instagram-line"></i></a>
                    <a href="#" className="social__link-icon"><i className="ri-linkedin-line"></i></a>
                    <a href="#" className="social__link-icon"><i className="ri-twitter-line"></i></a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
  );
};

export default Contact;
