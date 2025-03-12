import React from "react";
import {Button, Col} from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import carJsonData from "../../assets/data/carData.js"; // Import JSON data

const CarItem = (props) => {
  const { carName, carModel, carYear, CarStatus } = props.item; // Data from backend

  // Find corresponding JSON data
  const jsonCar = carJsonData.find((car) => car.carName === carName);

  // Use JSON data if found, otherwise provide fallback values
  const imgUrl = jsonCar?.imgUrl || "";
  const automatic = jsonCar?.automatic || "N/A";
  const speed = jsonCar?.speed || "N/A";
  const price = jsonCar?.price || "N/A";

  return (
      <Col lg="4" md="4" sm="6" className="mb-5">
        <div className="car__item">
          <div className="car__img">
            <img src={imgUrl} alt={carName} className="w-100" />
          </div>

          <div className="car__item-content mt-4">
            <h4 className="section__title text-center">{carName}</h4>
            <h6 className="rent__price text-center mt-">
              ${price}.00 <span>/ Day</span>
            </h6>

            <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {carModel}
            </span>
              <span className=" d-flex align-items-center gap-1">
              <i className="ri-calendar-line"></i> {carYear}
            </span>
              <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {automatic}
            </span>
              <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {speed}
            </span>
            </div>

            {/*<button className=" w-50 car__item-btn car__btn-rent">*/}
            {/*  <Link to={`/cars/${carName}`}>Rent</Link>*/}
            {/*</button>*/}

            <Button className=" w-100 car__item-btn car__btn-details">
              <Link to={`/cars/${carName}`}>Details</Link>
            </Button>
          </div>
        </div>
      </Col>
  );
};

export default CarItem;
