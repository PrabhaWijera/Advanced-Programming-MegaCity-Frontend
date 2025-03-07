import React from "react";
import Slider from "react-slick";

import "../../styles/testimonial.css";

import ava01 from "../../assets/all-images/ava-1.jpg";
import ava02 from "../../assets/all-images/ava-2.jpg";
import ava03 from "../../assets/all-images/ava-3.jpg";
import ava04 from "../../assets/all-images/ava-4.jpg";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p className="section__description">
          <b>
            Reliable and Professional Service
        </b>
          "Mega City Cab is always reliable. The drivers are punctual, and the vehicles are clean and comfortable. I always trust them for my trips around Colombo."
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava01} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Nimal Perera</h6>
            <p className="section__description">Colombo, Sri Lanka</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
          <b>Great Airport Transfer
          </b>
          "Booking an airport transfer was so easy. The driver was waiting for me when I landed, and the ride to my hotel was smooth and stress-free."
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava02} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3"> Priya Wijesuriya</h6>
            <p className="section__description">Kandy, Sri Lanka</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
          <b>Affordable and Convenient Car Rental</b>
          "The unlimited miles car rental service was great. I had the freedom to explore Colombo and beyond without worrying about extra charges. Great service!"
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava03} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Samantha Jayasinghe</h6>
            <p className="section__description">Negombo, Sri Lanka</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        <b>Perfect for Business Travel</b>
          "I often travel for work, and Mega City Cab never disappoints. Quick, reliable, and professional. I’ll always choose them for my transportation needs."
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava04} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Tharindu Rajapaksha</h6>
            <p className="section__description">Colombo, Sri Lanka</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonial;
