import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for API call
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet.jsx";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import carJsonData from "../assets/data/carData"; // Import JSON data

const CarDetails = () => {
  const { slug } = useParams(); // Get car name from URL
  const [backendCar, setBackendCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(
            "http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage"
        );

        // Find the car from backend API using carName (slug)
        const car = response.data.find((car) => car.name === slug);

        if (car) {
          setBackendCar({
            carID: car.id,
            plateNumber: car.plate_number,
            carName: car.name,
            carModel: car.model,
            carYear: car.year,
            carStatus: car.status,
          });
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [slug]);

  if (loading) return <p>Loading car details...</p>;
  if (!backendCar) return <p>Car not found!</p>;

  // Find JSON data matching the car
  const jsonCar = carJsonData.find((car) => car.carName === slug);

  // Merge backend & JSON data
  const singleCarItem = {
    ...backendCar, // Backend data: carName, carModel, carYear, carStatus
    imgUrl: jsonCar?.imgUrl || "", // JSON data
    automatic: jsonCar?.automatic || "N/A",
    speed: jsonCar?.speed || "N/A",
    price: jsonCar?.price || "N/A",
    gps: jsonCar?.gps || "N/A",
    seatType: jsonCar?.seatType || "N/A",
    brand: jsonCar?.brand || "N/A",
    rating: jsonCar?.rating || "N/A",
    description: jsonCar?.description || "No description available",
  };

  return (
      <Helmet title={singleCarItem.carName}>
        <section>
          <Container>
            <Row>
              <Col lg="6">
                <img src={singleCarItem.imgUrl} alt={singleCarItem.carName} className="w-100" />
              </Col>

              <Col lg="6">
                <div className="car__info">
                  <h2 className="section__title">{singleCarItem.carName}</h2>

                  <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                    <h6 className="rent__price fw-bold fs-4">
                      ${singleCarItem.price}.00 / Day
                    </h6>

                    <span className="d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    ({singleCarItem.rating} ratings)
                  </span>
                  </div>

                  <p className="section__description">{singleCarItem.description}</p>

                  <div className="d-flex align-items-center mt-3" style={{ columnGap: "4rem" }}>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-roadster-line" style={{ color: "#f9a826" }}></i> {singleCarItem.carModel}
                  </span>
                    <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-calendar-line" style={{ color: "#f9a826" }}></i> {singleCarItem.carYear}
                  </span>
                    <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-settings-2-line" style={{ color: "#f9a826" }}></i> {singleCarItem.automatic}
                  </span>
                    <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-timer-flash-line" style={{ color: "#f9a826" }}></i> {singleCarItem.speed}
                  </span>
                  </div>

                  <div className="d-flex align-items-center mt-3" style={{ columnGap: "2.8rem" }}>
                  <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-map-pin-line" style={{ color: "#f9a826" }}></i> {singleCarItem.gps}
                  </span>
                    <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-wheelchair-line" style={{ color: "#f9a826" }}></i> {singleCarItem.seatType}
                  </span>
                    <span className="d-flex align-items-center gap-1 section__description">
                    <i className="ri-building-2-line" style={{ color: "#f9a826" }}></i> {singleCarItem.brand}
                  </span>
                  </div>
                </div>
              </Col>

              <Col lg="12" className="mt-5">
                <div className="booking-info mt-5">
                  <h5 className="mb-4 fw-bold">Booking Information</h5>
                  <BookingForm carData={singleCarItem} backendCarData={backendCar} />
                </div>
              </Col>

              {/*<Col lg="5" className="mt-5">*/}
              {/*  <div className="payment__info mt-5">*/}
              {/*    <h5 className="mb-4 fw-bold">Payment Information</h5>*/}
              {/*    <PaymentMethod  />*/}
              {/*  </div>*/}
              {/*</Col>*/}
            </Row>
          </Container>
        </section>
      </Helmet>
  );
};

export default CarDetails;
