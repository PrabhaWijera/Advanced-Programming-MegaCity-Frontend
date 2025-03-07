import React, { useState } from "react";
import "../../styles/become-driver.css";
import { Container, Row, Col, Modal, ModalHeader, ModalBody, Button } from "reactstrap";

import driverImg from "../../assets/all-images/toyota-offer-2.png";
import logo from "../../assets/all-images/login/Black and Orange Car Rent Logo.png";

const BecomeDriverSection = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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

              <button className="btn become__driver-btn mt-4" onClick={toggle}>
                Become a Driver
              </button>
            </Col>
          </Row>
        </Container>

        {/* Modal */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Contact Head Office</ModalHeader>
          <img src={logo} alt="" className="w-50 h-20 mx-auto  mt-3" />
          <ModalBody>
            <p>For more information, please contact our head office at:</p>
            <p><strong>Phone:</strong> +94 760368019</p>
            <p><strong>Email:</strong> megaCitySri@gmail.com</p>
            <p><strong>Address:</strong> Colombo City,Western Srilanka</p>
          </ModalBody>
        </Modal>
      </section>
  );
};

export default BecomeDriverSection;
