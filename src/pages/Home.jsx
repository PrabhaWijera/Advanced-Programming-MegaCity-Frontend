import React, {useEffect, useState} from "react";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet.jsx";

import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";

import BlogList from "../components/UI/BlogList";
import axios from "axios";


const Home = () => {
    const [carData, setCarData] = useState([]); // State to store car data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage");
                const carsData = response.data.map((car) => ({
                    ...car,
                    plateNumber: car.plateNumber, // Adjust field name to match frontend
                    carName:car.name,
                    carModal:car.model,
                    carYear:car.year,
                    CarStatus:car.status

                }));

                setCarData(carsData); // Update state with fetched data
            } catch (error) {
                console.error("Error fetching cars", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars(); // Call function on mount
    }, []);
  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        <div className="hero__form">
          <Container>
            {/*<Row className="form__row">*/}
            {/*  <Col lg="4" md="4">*/}
            {/*    <div className="find__cars-left">*/}
            {/*      <h2>Find your best car here</h2>*/}
            {/*    </div>*/}
            {/*  </Col>*/}

            {/*  <Col lg="8" md="8" sm="12">*/}
            {/*    <FindCarForm />*/}

            {/*  </Col>*/}
            {/*</Row>*/}
          </Container>
        </div>
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>
      {/* =========== car offer section ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
            </Col>

              {carData.length > 0 ? (
                  carData.map((item) => <CarItem item={item} key={item.id} />)
              ) : (
                  <p>No cars available</p>
              )}
          </Row>
        </Container>
      </section>
      {/* =========== become a driver section ============ */}
      <BecomeDriverSection />

      {/* =========== testimonial section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section>

      {/* =============== blog section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Explore our blogs</h6>
              <h2 className="section__title">Latest Blogs</h2>
            </Col>

            <BlogList />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
