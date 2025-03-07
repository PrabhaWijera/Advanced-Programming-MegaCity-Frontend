import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet.jsx";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchQuery: "",
    model: "",
    year: "",
    status: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage");
        const carsData = response.data.map((car) => ({
          ...car,
          plateNumber: car.plateNumber,
          carName: car.name,
          carModel: car.model,
          carYear: car.year,
          carStatus: car.status,
        }));

        setCars(carsData);
      } catch (error) {
        console.error("Error fetching cars", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filterOptions = {
    models: [...new Set(cars.map((car) => car.carModel))],
    years: [...new Set(cars.map((car) => car.carYear))],
    statuses: [...new Set(cars.map((car) => car.carStatus))],
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuery: e.target.value,
    }));
  };

  const filteredCars = cars.filter((car) => {
    return (
        (!filters.model || car.carModel === filters.model) &&
        (!filters.year || car.carYear === filters.year) &&
        (!filters.status || car.carStatus === filters.status) &&
        (!filters.searchQuery ||
            car.carName.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            car.plateNumber.toLowerCase().includes(filters.searchQuery.toLowerCase()))
    );
  });

  return (
      <Helmet title="Cars">
        <CommonSection title="Car Listing" />
        <section>
          <Container>
            <Row>
              <Col lg="12">
                <div className="card p-4 mb-4">
                  <h3>Filters</h3>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Search by Name or Plate Number</label>
                      <input
                          type="text"
                          className="form-control"
                          value={filters.searchQuery}
                          onChange={handleSearchChange}
                          placeholder="Search..."
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Filter by Model</label>
                      <select
                          name="model"
                          className="form-select"
                          value={filters.model}
                          onChange={handleFilterChange}
                      >
                        <option value="">Select Model</option>
                        {filterOptions.models.map((model) => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Filter by Year</label>
                      <select
                          name="year"
                          className="form-select"
                          value={filters.year}
                          onChange={handleFilterChange}
                      >
                        <option value="">Select Year</option>
                        {filterOptions.years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Filter by Status</label>
                      <select
                          name="status"
                          className="form-select"
                          value={filters.status}
                          onChange={handleFilterChange}
                      >
                        <option value="">Select Status</option>
                        {filterOptions.statuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section>
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h6 className="section__subtitle">Come with</h6>
                <h2 className="section__title">Hot Offers</h2>
              </Col>
              {loading ? (
                  <p>Loading cars...</p>
              ) : error ? (
                  <p>Error loading cars.</p>
              ) : filteredCars.length > 0 ? (
                  filteredCars.map((item) => <CarItem item={item} key={item.id} />)
              ) : (
                  <p>No cars available</p>
              )}
            </Row>
          </Container>
        </section>
      </Helmet>
  );
};

export default CarListing;
