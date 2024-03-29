import React from 'react';
import { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import CarCard from '../components/CarCard';
import axios from 'axios';
import { serverUrl } from '../utils/serverUrl';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [cars, setCars] = useState([]);

  // Fetch blog and car data from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/blogs/list`);
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    const fetchCars = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/cars/list`);
        setCars(response.data.cars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchBlogs();
    fetchCars();
  }, []);
  
  // Get the latest 4 blogs and cars
  const latestBlogs = blogs.slice(0, 4);
  const latestCars = cars.slice(0, 4);

  // Analytics data
  const totalBlogs = blogs.length;
  const totalCars = cars.length;

  return (
    <div className="container mx-auto p-4">
      {/* Welcome text */}
      <p className="text-4xl mb-4 font-extrabold font-poppins">Hi, welcome to the Dashboard!</p>

      {/* Analytics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-500 text-white p-4 rounded">
          <p className="text-xl font-bold">Total Blogs</p>
          <p className="text-4xl">{totalBlogs}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded">
          <p className="text-xl font-bold">Total Cars</p>
          <p className="text-4xl">{totalCars}</p>
        </div>
      </div>

      {/* Heading for Blogs */}
      <h2 className="text-2xl font-bold mb-4">Latest Blogs</h2>

      {/* Blog cards grid or flex */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-1000 ease-in-out mb-4">
        {latestBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {/* Heading for Cars */}
      <h2 className="text-2xl font-bold mb-4">Latest Cars</h2>

      {/* Car cards grid or flex */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-1000 ease-in-out">
        {latestCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
