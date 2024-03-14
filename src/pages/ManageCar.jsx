import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageCar = () => {
  // State for blog data
  const [cars, setCars] = useState([]);
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);
  // Number of cars to display per page
  const carsPerPage = 4;
  // State for search input
  const [searchInput, setSearchInput] = useState('');

  // Fetch blog data from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cars/list');
        setCars(response.data.cars);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchCars();
  }, []);

  // Filtered cars based on search input
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Calculate the index of the first and last car to display
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;

  // Slice the array to get the cars to display on the current page
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  // Function to handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to handle search
  const handleSearch = () => {
    setCurrentPage(1); // Reset currentPage to 1 when performing a new search
    setSearchInput(/* Add your logic here */);
  };

  return (
    <div className="container mx-auto p-4 min-h-[100vh]">
      {/* Search bar */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mr-2"
        />
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Heading for cars */}
      <h2 className="text-2xl font-bold mb-4">Cars</h2>

      {/* Add New Car button */}
      <Link to="/add-car" className="bg-green-500 text-white p-2 rounded mt-4 inline-block">
        Add New Car
      </Link>

      {/* Car cards grid or flex */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-1000 ease-in-out">
        {currentCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="flex justify-center mt-4">
        {filteredCars.length > carsPerPage && (
          <div>
            {Array.from(
              { length: Math.ceil(filteredCars.length / carsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  className={`mx-2 p-2 border ${
                    currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'
                  } rounded`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCar;
