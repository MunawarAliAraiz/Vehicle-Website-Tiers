import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
  const { img, name, _id } = car;
  const navigate = useNavigate();

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
      await axios.delete(`http://localhost:4000/api/cars/${_id}`);
      console.log('Car deleted successfully');
      // Redirect to the car management page or any other appropriate page
      navigate('/manage-cars');
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md w-72 mx-4 my-8 transition duration-300 ease-in-out transform hover:scale-105">
        <Link to={{ pathname: `/car/${_id}` }}>
          {/* Image of the car */}
          <img src={img} alt="Car Image" className="w-full h-40 object-cover" />

          {/* Content container */}
          <div className="p-4">
            {/* Car name */}
            <div className="text-lg font-bold text-center">{name}</div>
          </div>
        </Link>
        {/* Edit and Delete buttons */}
      <div className="flex">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}
          className="flex-1 bg-blue-500 text-white rounded-full p-2 m-1 hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            confirmDelete();
          }}
          className="flex-1 bg-red-500 text-white rounded-full p-2 m-1 hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CarCard;
