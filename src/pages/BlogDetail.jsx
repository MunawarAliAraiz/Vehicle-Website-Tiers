import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../utils/serverUrl';

const BlogDetail = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/blogs/${_id}`);
        setBlog(response.data.blog);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [_id]);

  const handleEdit = () => {
    navigate(`/edit-blog/${_id}`);
  };

  const confirmDelete = () => {
    const result = window.confirm('Are you sure you want to delete this blog?');
    if (result) {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    try {
      // Send delete request to the API
      await axios.delete(`http://localhost:4000/api/blogs/${_id}`);
      console.log('Blog deleted successfully');
      // Redirect to the blog management page or any other appropriate page
      navigate('/manage-blogs');
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (!blog) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  const { img, title, details, writer, createdAt } = blog;

  return (
    <div className="container mx-auto p-4 min-h-[100vh]">
      <p
        className="text-blue-500 cursor-pointer hover:underline mb-4 pl-2"
        onClick={() => navigate(-1)}
        style={{ backgroundColor: '#f0f4f8', display: 'inline-block', borderRadius: '0.25rem' }}
      >
        ← Back to All Blogs
      </p>

      <div className='flex justify-center'>
        <img src={img} alt="Blog" className="w-1/2 object-cover rounded-lg mb-4" />
      </div>

      <div className="bg-gray-100 p-6 rounded-md shadow-md text-center">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{details}</p>
        <p className="text-gray-500">Written by {writer} on {createdAt}</p>

        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600"
            onClick={handleEdit}
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

export default BlogDetail;
