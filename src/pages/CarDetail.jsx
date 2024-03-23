import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../utils/serverUrl';


const CarDetail = () => {
  // Accessing the 'id' parameter from the URL
  const { _id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/cars/${_id}`);
        setCar(response.data.car);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };

    fetchCar();
  }, [_id]);


  const handleEdit = () => {
    navigate(`/edit-car/${_id}`);
  };

  const confirmDelete = () => {
    const result = window.confirm('Are you sure you want to delete this car?');
    if (result) {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    try {
      // Send delete request to the API
      await axios.delete(`${serverUrl}/api/cars/${_id}`);
      console.log('Car deleted successfully');
      // Redirect to the blog management page or any other appropriate page
      navigate('/manage-blogs');
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  if (!car) {
    // Handle case when the car is not found
    return <div className="text-center mt-8">Loading...</div>;
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
            onClick={(id)=> handleEdit(id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
