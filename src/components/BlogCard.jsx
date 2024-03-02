// BlogCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { img, title, id } = blog;

  return (
    <Link to={{ pathname: `/blog/${id}` }}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md w-72 mx-4 my-8 transition duration-300 ease-in-out transform hover:scale-105">
        {/* Image of the blog */}
        <img src={img} alt="Blog Image" className="w-full h-40 object-cover" />

        {/* Content container */}
        <div className="p-4">
          {/* Blog title */}
          <div className="text-lg font-bold text-center">{title}</div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
