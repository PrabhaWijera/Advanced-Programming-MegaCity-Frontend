import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const createCar = async (formData) => {
    try {
        const response = await axios.post('http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading car and image', error);
        throw error;
    }
};

const updateCar = async (carId, formData) => {
    try {
        formData.append('carId', carId);  // Append the carId when updating
        const response = await axios.put('http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating car and image', error);
        throw error;
    }
};

const deleteCar = async (carId) => {
    try {
        const response = await axios.delete('http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage', {
            headers: { 'Content-Type': 'multipart/form-data' },
            params: { carId: carId }
        });
        alert('Car deleted successfully!');
    } catch (error) {
        console.error('Error deleting car', error);
        alert('Error deleting car');
    }
};

const fetchCars = async () => {
    try {
        const response = await axios.get('http://localhost:8080/MegaCity_war_exploded/uploadCarWithImage');
        const carsData = response.data.map(car => ({
            ...car,
            plateNumber: car.plate_number, // Adjust field name to match frontend
            imagePath: car.imagePath,
        }));

        return carsData;
    } catch (error) {
        console.error('Error fetching cars', error);
        throw error;
    }
};

function CarForm() {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [filters, setFilters] = useState({ model: '', year: '', status: '', searchQuery: '' });

    useEffect(() => {
        const fetchData = async () => {
            const carsData = await fetchCars();
            setCars(carsData);
        };

        fetchData();
    }, []);

    const filterOptions = {
        models: [...new Set(cars.map(car => car.model))],
        years: [...new Set(cars.map(car => car.year))],
        statuses: [...new Set(cars.map(car => car.status))],
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('model', data.model);
        formData.append('plate_number', data.plateNumber);
        formData.append('year', data.year);
        formData.append('status', data.status);

        if (file) {
            formData.append('carImage', file);
        }

        try {
            setUploading(true);

            if (selectedCar) {
                // Include only the fields that were modified
                const updatedCar = await updateCar(selectedCar.id, formData);
                setCars(cars.map(car => car.id === selectedCar.id ? updatedCar : car));
            } else {
                const newCar = await createCar(formData);
                setCars([...cars, newCar]);
            }

            alert('Car details saved successfully!');
            reset();
            setFile(null);
        } catch (error) {
            console.error('Error processing car data', error);
        } finally {
            setUploading(false);
            setSelectedCar(null);
        }
    };

    const handleUpdate = (car) => {
        setSelectedCar(car);
        setValue('carId', car.id);
        setValue('name', car.name);
        setValue('model', car.model);
        setValue('plateNumber', car.plateNumber);
        setValue('year', car.year);
        setValue('status', car.status);
        setFile(null);
    };

    const handleDelete = async (carId) => {
        try {
            await deleteCar(carId);
            setCars(cars.filter(car => car.id !== carId));
            alert('Car deleted successfully!');
        } catch (error) {
            console.error('Error deleting car', error);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSearchChange = (e) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            searchQuery: e.target.value
        }));
    };

    const filteredCars = cars.filter(car => {
        return (
            (!filters.model || car.model === filters.model) &&
            (!filters.year || car.year === filters.year) &&
            (!filters.status || car.status === filters.status) &&
            (!filters.searchQuery || car.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) || car.plateNumber.toLowerCase().includes(filters.searchQuery.toLowerCase()))
        );
    });

    return (
        <div className="container mt-4">
            {/* Inputs Section */}
            <div className="card p-4 mb-4">
                 <Link to={'/admin'} className='mb-2'>
                    <Button variant="outline-dark" >
                       🔙
                    </Button>
                 </Link>
                <h2>{selectedCar ? 'Update Car Details' : 'Add Car Details and Image'}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Car Name</label>
                            <input type="text" className="form-control" {...register('name', { required: 'Car name is required' })} />
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Car Model</label>
                            <input type="text" className="form-control" {...register('model', { required: 'Car model is required' })} />
                            {errors.model && <span className="text-danger">{errors.model.message}</span>}
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Plate Number</label>
                            <input type="text" className="form-control" {...register('plateNumber', { required: 'Plate number is required' })} />
                            {errors.plateNumber && <span className="text-danger">{errors.plateNumber.message}</span>}
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Year</label>
                            <input type="number" className="form-control" {...register('year', { required: 'Car year is required' })} />
                            {errors.year && <span className="text-danger">{errors.year.message}</span>}
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Status</label>
                            <input type="text" className="form-control" {...register('status', { required: 'Car status is required' })} />
                            {errors.status && <span className="text-danger">{errors.status.message}</span>}
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Car Image</label>
                            <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Submit'}
                    </button>
                </form>
            </div>

            {/* Filters Section */}
            <div className="card p-4 mb-4">
                <h3>Filters</h3>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Search by Name or Plate Number</label>
                        <input type="text" className="form-control" value={filters.searchQuery} onChange={handleSearchChange} placeholder="Search..." />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Filter by Model</label>
                        <select name="model" className="form-select" value={filters.model} onChange={handleFilterChange}>
                            <option value="">Select Model</option>
                            {filterOptions.models.map((model) => (
                                <option key={model} value={model}>{model}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Filter by Year</label>
                        <select name="year" className="form-select" value={filters.year} onChange={handleFilterChange}>
                            <option value="">Select Year</option>
                            {filterOptions.years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Filter by Status</label>
                        <select name="status" className="form-select" value={filters.status} onChange={handleFilterChange}>
                            <option value="">Select Status</option>
                            {filterOptions.statuses.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Cars List Section */}
            <div className="card p-4">
                <h3>Cars List</h3>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Car Name</th>
                        <th>Model</th>
                        <th>Plate Number</th>
                        <th>Year</th>
                        <th>Status</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCars.map((car) => (
                        <tr key={car.id}>
                            <td>{car.name}</td>
                            <td>{car.model}</td>
                            <td>{car.plateNumber}</td>
                            <td>{car.year}</td>
                            <td>{car.status}</td>
                            <td>
                                <img src={`http://localhost:8080/MegaCity_war_exploded/uploads/${car.imagePath}`} alt={car.name} width="100" />
                            </td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleUpdate(car)}>Update</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(car.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CarForm;
