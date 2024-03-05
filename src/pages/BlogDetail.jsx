// BlogDetail.js
import React from 'react';
import { blogs } from '../utils/blogsData';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDetail = () => {
  // Accessing the 'id' parameter from the URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the blog with the matching ID
  const blog = blogs.find((blog) => blog.id === Number(id));

  if (!blog) {
    // Handle case when the blog is not found
    return <div className="text-center mt-8">Blog not found</div>;
  }

  // Destructuring blog details
  const { img, title, details, writer, createdAt } = blog;

  // Handle Edit button click
  const handleEdit = () => {
    navigate(`/edit-blog/${id}`)
    console.log('Edit button clicked');
  };

  // Handle Delete button click
  const handleDelete = () => {
    // Add logic to delete the current blog
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
        ← Back to All Blogs
      </p>

      {/* Blog Image */}
      <div className='flex justify-center'>
        <img src={img} alt="Car" className="w-1/2 object-cover rounded-lg mb-4" />
      </div>

      {/* Blog Title, Details, Writer, and Date Created */}
      <div className="bg-gray-100 p-6 rounded-md shadow-md text-center">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{details}</p>
        <p className="text-gray-500">Written by {writer} on {createdAt}</p>

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
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
