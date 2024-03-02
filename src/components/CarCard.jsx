// CarCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  const { img, name, id } = car;

  return (
    <Link to={{ pathname: `/car/${id}` }}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md w-72 mx-4 my-8 transition duration-300 ease-in-out transform hover:scale-105">
        {/* Image of the car */}
        <img src={img} alt="Car Image" className="w-full h-40 object-cover" />

        {/* Content container */}
        <div className="p-4">
          {/* Car name */}
          <div className="text-lg font-bold text-center">{name}</div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
