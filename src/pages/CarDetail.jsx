// CarDetail.js
import React from 'react';
import { cars } from '../utils/carsData';
import { useParams, useNavigate } from 'react-router-dom';

const CarDetail = () => {
  // Accessing the 'id' parameter from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the car with the matching ID
  const car = cars.find((car) => car.id === Number(id));

  if (!car) {
    // Handle case when the car is not found
    return <div className="text-center mt-8">Car not found</div>;
  }

  // Destructuring car details
  const {
    img,
    name,
    model,
    price,
    no,
    registeredIn,
    color,
    assembly,
    engineCapacity,
    bodyType,
    carType,
    additionalDetails,
    createdAt,
  } = car;

  // Handle Edit button click
  const handleEdit = () => {
    // Add logic to navigate to the edit page for the current car
    console.log('Edit button clicked');
  };

  // Handle Delete button click
  const handleDelete = () => {
    // Add logic to delete the current car
    console.log('Delete button clicked');
  };

  return (
    <div className="container mx-auto p-4 min-h-[100vh]">
      {/* Back to Home Link */}
      <p
        className="text-blue-500 cursor-pointer hover:underline mb-4 pl-2"
        onClick={() => navigate(-1)}
        style={{ backgroundColor: '#f0f4f8', display: 'inline-block', borderRadius: '0.25rem' }}
      >
        ← Back to All Cars
      </p>

      {/* Car Image */}
      <div className='flex justify-center'>
        <img src={img} alt="Car" className="w-1/2 object-cover rounded-lg mb-4" />
      </div>

      {/* Car Details */}
      <div className="bg-gray-100 p-6 rounded-md shadow-md text-center">
        <h2 className="text-3xl font-bold mb-2">{name}</h2>
        <p className="text-gray-600">{`${model} - ${price}`}</p>
        <p className="text-gray-500">License Plate: {no}</p>
        <p className="text-gray-500">Registered in: {registeredIn}</p>
        <p className="text-gray-500">Color: {color}</p>
        <p className="text-gray-500">Assembly: {assembly}</p>
        <p className="text-gray-500">Engine Capacity: {engineCapacity}</p>
        <p className="text-gray-500">Body Type: {bodyType}</p>
        <p className="text-gray-500">Car Type: {carType}</p>
        <p className="text-gray-600">{additionalDetails}</p>
        <p className="text-gray-500">Created at: {createdAt}</p>

        {/* Edit and Delete buttons */}
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
