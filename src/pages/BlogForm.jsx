import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogs } from '../utils/blogsData';

const BlogForm = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  // State for blog data
  const [blogData, setBlogData] = useState({
    img: '',
    title: '',
    details: '',
    writer: '',
    createdAt: '',
    updatedAt: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission (add or edit blog)
    if (blogId) {
      // Logic for editing blog
      console.log('Editing blog with ID:', blogId, blogData);
      // Update the blog data in your state or API
    } else {
      // Logic for adding new blog
      console.log('Adding new blog', blogData);
      // Add the new blog data to your state or API
    }
    navigate('/manage-blogs'); // Navigate to the blog management page after submission
  };

  // Fetch initial blog data if editing an existing blog
  useEffect(() => {
    if (blogId) {
      // Assuming you have a function to fetch blog data based on the ID from your API
      // Replace the following placeholder with your actual API call
      fetchBlogDataById(blogId);
    }
  }, [blogId]);

  // Function to fetch blog data based on ID (replace with your actual API call)
  const fetchBlogDataById = (blogId) => {
    const blog = blogs.find((blog) => blog.id === Number(blogId));
    if (blog) {
      setBlogData(blog);
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
        ← Back to All Blogs
      </p>
      <h2 className="text-2xl font-bold mb-4">{blogId ? 'Edit Blog' : 'Add Blog'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for blog data */}
        <div className="mb-4">
          <label htmlFor="img" className="block text-gray-700 font-bold mb-2">
            Image URL:
          </label>
          <input
            type="text"
            id="img"
            name="img"
            value={blogData.img}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={blogData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="details" className="block text-gray-700 font-bold mb-2">
            Details:
          </label>
          <textarea
            id="details"
            name="details"
            value={blogData.details}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="writer" className="block text-gray-700 font-bold mb-2">
            Writer:
          </label>
          <input
            type="text"
            id="writer"
            name="writer"
            value={blogData.writer}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="createdAt" className="block text-gray-700 font-bold mb-2">
            Created At:
          </label>
          <input
            type="text"
            id="createdAt"
            name="createdAt"
            value={blogData.createdAt}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          {blogId ? 'Update Blog' : 'Add Blog'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
