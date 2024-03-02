import React, { useState } from 'react';
import BlogCard from '../components/BlogCard';
import { blogs } from '../utils/blogsData';

const ManageBlog = () => {
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  // Number of blogs to display per page
  const blogsPerPage = 4;

  // State for search input
  const [searchInput, setSearchInput] = useState('');

  // Filtered blogs based on search input
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Calculate the index of the first and last blog to display
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  // Slice the array to get the blogs to display on the current page
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

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

      {/* Heading for blogs */}
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>

      {/* Blog cards grid or flex */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-1000 ease-in-out">
        {currentBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="flex justify-center mt-4">
        {filteredBlogs.length > blogsPerPage && (
          <div>
            {Array.from(
              { length: Math.ceil(filteredBlogs.length / blogsPerPage) },
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

export default ManageBlog;
