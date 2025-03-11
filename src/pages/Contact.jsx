import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet.jsx";
import CommonSection from "../components/UI/CommonSection";
import ToastNotification, { showToast } from "../../src/components/UI/ToastNotification.jsx";
import "../styles/contact.css";
import { validateName, validateEmail, validateMessage } from "../context/validationContact.jsx";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState(""); // For feedback messages (success or error)
  const [isLoading, setIsLoading] = useState(false); // To manage loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });
  const validateForm = () => {
    let formErrors = { name: "", email: "", message: "" };
    let isValid = true;

    // Name validation
    if (!validateName(formData.name)) {
      formErrors.name = "Name must be at least 3 characters long.";
      isValid = false;
    }

    // Email validation
    if (!validateEmail(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Message validation
    if (!validateMessage(formData.message)) {
      formErrors.message = "Message must be at least 10 characters long.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!validateForm()) {
      setStatus("Please fix the errors before submitting.");
      return;
    }


    setIsLoading(true);
    setStatus(""); // Reset status message before submitting

    try {
      const response = await fetch("http://localhost:8080/MegaCity_war_exploded/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 200) {
        showToast(200, "Message sent successfully! ✅");
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setStatus(result.error || "Error sending message.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      showToast(500, "Error: Something went wrong! ❌");
      setStatus("Error sending message.");
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
                  </FormGroup>

                  <button className="contact__btn" type="submit" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </Col>

              <Col lg="5" md="5">
                <div className="contact__info">
                  <h6 className="fw-bold">Contact Information</h6>
                  <p className="section__description mb-0">
                    Colombo City,Western Sri Lanka
                  </p>
                  <div className=" d-flex align-items-center gap-2">
                    <h6 className="fs-6 mb-0">Phone:</h6>
                    <p className="section__description mb-0">+94 760368019</p>
                  </div>

                  <div className=" d-flex align-items-center gap-2">
                    <h6 className="mb-0 fs-6">Email:</h6>
                    <p className="section__description mb-0">megaCitySri@gmail.com</p>
                  </div>

                  <h6 className="fw-bold mt-4">Follow Us</h6>

                  <div className="d-flex align-items-center gap-4 mt-3">
                    <a href="#" className="social__link-icon">
                      <i className="ri-facebook-line"></i>
                    </a>
                    <a href="#" className="social__link-icon">
                      <i className="ri-instagram-line"></i>
                    </a>
                    <a href="#" className="social__link-icon">
                      <i className="ri-linkedin-line"></i>
                    </a>
                    <a href="#" className="social__link-icon">
                      <i className="ri-twitter-line"></i>
                    </a>
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
