// BlogCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { img, title, _id } = blog;
  const navigate = useNavigate();

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

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md w-72 mx-4 my-8 transition duration-300 ease-in-out transform hover:scale-105">
        <Link to={{ pathname: `/blog/${_id}` }}>
          {/* Image of the blog */}
          <img src={img} alt="Blog Image" className="w-full h-40 object-cover" />

          {/* Content container */}
          <div className="p-4">
            {/* Blog title */}
            <div className="text-lg font-bold text-center">{title}</div>
          </div>
        </Link>
        {/* Edit and Delete buttons */}
      <div className="flex">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(_id);
          }}
          className="flex-1 bg-blue-500 text-white rounded-full p-2 m-1 hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            confirmDelete(_id);
          }}
          className="flex-1 bg-red-500 text-white rounded-full p-2 m-1 hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
