import React from "react";
import "../../styles/become-driver.css";
import { Container, Row, Col } from "reactstrap";

import driverImg from "../../assets/all-images/toyota-offer-2.png";

const BecomeDriverSection = () => {
  return (
      <section className="become__driver">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="become__driver-img">
              <img src={driverImg} alt="" className="w-100" />
            </Col>

            <Col lg="6" md="6" sm="12">
              <h2 className="section__title become__driver-title">
                Ready to Drive with Us? Connect with Our Team and Start Your Journey
              </h2>

              <p className="become__driver-description mt-3 ">
                Join our community of drivers by reaching out to our admin team. They’ll assist you with all the details, including account setup and access.
              </p>

              <button className="btn become__driver-btn mt-4">
                Become a Driver
              </button>
            </Col>
          </Row>
        </Container>
      </section>
  );
};

export default BecomeDriverSection;
