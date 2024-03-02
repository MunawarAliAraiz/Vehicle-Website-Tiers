import React, { useState } from 'react';
import PageCard from '../components/PageCard';
import { pages } from '../utils/data'

const Home = () => {
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  // Number of pages to display per page
  const pagesPerPage = 4;

  // State for search input
  const [searchInput, setSearchInput] = useState('');

  // Filtered pages based on search input
  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Calculate the index of the first and last page to display
  const indexOfLastPage = currentPage * pagesPerPage;
  const indexOfFirstPage = indexOfLastPage - pagesPerPage;

  // Slice the array to get the pages to display on the current page
  const currentPages = filteredPages.slice(indexOfFirstPage, indexOfLastPage);

  // Function to handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to handle search
  const handleSearch = () => {
    // Add your search logic here
    // You may want to update the filteredPages state based on your search implementation
  };

  return (
    <div className="container mx-auto p-4">
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

      {/* Welcome text */}
      <p className="text-lg mb-4">Hi, welcome back!</p>

      {/* Heading for pages */}
      <h2 className="text-2xl font-bold mb-4">Pages</h2>

      {/* Page cards grid or flex */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-1000 ease-in-out">
        {currentPages.map((page) => (
          <PageCard key={page.id} page={page} />
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="flex justify-center mt-4">
        {filteredPages.length > pagesPerPage && (
          <div>
            {Array.from({ length: Math.ceil(filteredPages.length / pagesPerPage) }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-2 p-2 border ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'
                } rounded`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
