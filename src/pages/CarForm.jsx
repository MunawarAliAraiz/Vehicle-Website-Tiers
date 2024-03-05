import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cars } from '../utils/carsData';


const CarForm = () => {
  
  const { carId } = useParams();
  const navigate = useNavigate();

  // State for car data
  const [carData, setCarData] = useState({
    name: '',
    img: '',
    model: '',
    price: '',
    no: '',
    registeredIn: '',
    color: '',
    assembly: '',
    engineCapacity: '',
    bodyType: '',
    carType: '',
    additionalDetails: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission (add or edit car)
    if (id) {
      // Logic for editing car
      console.log('Editing car with ID:', carId, carData);
      // Update the car data in your state or API
    } else {
      // Logic for adding new car
      console.log('Adding new car', carData);
      // Add the new car data to your state or API
    }
    navigate('/manage-cars'); // Navigate to the car management page after submission
  };

  // Fetch initial car data if editing an existing car
  useEffect(() => {
    if (carId) {
      // Assuming you have a function to fetch car data based on the ID from your API
      // Replace the following placeholder with your actual API call
      fetchCarDataById(carId);
    }
  }, [carId]);

  // Function to fetch car data based on ID (replace with your actual API call)
  const fetchCarDataById = (carId) => {
    const car = cars.find((car) => car.id === Number(carId));
    if (car) {
      setCarData(car);
    }
  };

  return (
    <div className="container mx-auto p-4">
        {/* Back to Home Link */}
      <p
        className="text-blue-500 cursor-pointer hover:underline mb-4 pl-2"
        onClick={() => navigate(-1)}
        style={{ backgroundColor: '#f0f4f8', display: 'inline-block', borderRadius: '0.25rem' }}
      >
        ← Back to All Cars
      </p>
      <h2 className="text-2xl font-bold mb-4">{carId ? 'Edit Car' : 'Add Car'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for car data */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Car Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={carData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="img" className="block text-gray-700 font-bold mb-2">
            Image URL:
          </label>
          <input
            type="text"
            id="img"
            name="img"
            value={carData.img}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="model" className="block text-gray-700 font-bold mb-2">
            Model:
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={carData.model}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={carData.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="no" className="block text-gray-700 font-bold mb-2">
            License Plate:
          </label>
          <input
            type="text"
            id="no"
            name="no"
            value={carData.no}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="registeredIn" className="block text-gray-700 font-bold mb-2">
            Registered In:
          </label>
          <input
            type="text"
            id="registeredIn"
            name="registeredIn"
            value={carData.registeredIn}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="color" className="block text-gray-700 font-bold mb-2">
            Color:
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={carData.color}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="assembly" className="block text-gray-700 font-bold mb-2">
            Assembly:
          </label>
          <input
            type="text"
            id="assembly"
            name="assembly"
            value={carData.assembly}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="engineCapacity" className="block text-gray-700 font-bold mb-2">
            Engine Capacity:
          </label>
          <input
            type="text"
            id="engineCapacity"
            name="engineCapacity"
            value={carData.engineCapacity}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bodyType" className="block text-gray-700 font-bold mb-2">
            Body Type:
          </label>
          <input
            type="text"
            id="bodyType"
            name="bodyType"
            value={carData.bodyType}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="carType" className="block text-gray-700 font-bold mb-2">
            Car Type:
          </label>
          <input
            type="text"
            id="carType"
            name="carType"
            value={carData.carType}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="additionalDetails" className="block text-gray-700 font-bold mb-2">
            Additional Details:
          </label>
          <textarea
            id="additionalDetails"
            name="additionalDetails"
            value={carData.additionalDetails}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          {carId ? 'Update Car' : 'Add Car'}
        </button>
      </form>
    </div>
  );
};

export default CarForm;
