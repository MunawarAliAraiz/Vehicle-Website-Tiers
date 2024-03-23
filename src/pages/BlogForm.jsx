import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { blogs } from '../utils/blogsData';
import { serverUrl } from '../utils/serverUrl';

const BlogForm = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  // State for blog data
  const [blogData, setBlogData] = useState({
    imgFile: null,
    img: '',
    title: '',
    details: '',
    writer: '',
    createdAt: null,
    updatedAt: null,
  });

  // State to track whether an image is uploaded
  const [imageUploaded, setImageUploaded] = useState(false);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    // If the input is a file input, use the selected file
    const file = name === 'img' ? files[0] : null;
  
    setBlogData((prevData) => ({
      ...prevData,
      [name]: name === 'img' ? URL.createObjectURL(files[0]) : value,
    }));

    // Set imageUploaded to true when an image is selected
    if (name === 'img' && file) {
      setImageUploaded(true);
      setBlogData((prevData) => ({
        ...prevData,
        imgFile: file,
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if a new image is selected for update
      if (blogData.imgFile) {
        // Step 1: Upload the image to the server
        const imageFormData = new FormData();
        imageFormData.append('blog_image', blogData.imgFile);
  
        const uploadResponse = await axios.post('http://localhost:4000/api/upload/blog/', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Extract the image URL from the response
        const imageUrl = uploadResponse.data.blog['url'];
  
        // Update the blog entry with the new image URL
        const blogPayload = {
          img: imageUrl,
          title: blogData.title,
          details: blogData.details,
          writer: blogData.writer,
          updatedAt: Date.now(),
        };
  
        if (blogId) {
          // Update the blog in the database
          const updateResponse = await axios.put(`http://localhost:4000/api/blogs/update/${blogId}`, blogPayload);
          alert('Blog updated successfully')
          navigate('/manage-blogs'); // Navigate to the blog management page after submission
        } else {
          // Add the new blog to the database
          const addResponse = await axios.post('http://localhost:4000/api/blogs/add', blogPayload);
          alert('Blog added successfully')
          navigate('/manage-blogs'); // Navigate to the blog management page after submission
        }
      } else {
        // No new image selected, update the blog without changing the image
        const blogPayload = {
          img: blogData.img,
          title: blogData.title,
          details: blogData.details,
          writer: blogData.writer,
          updatedAt: Date.now(),
        };
  
        if (blogId) {
          // Update the blog in the database
          const updateResponse = await axios.put(`http://localhost:4000/api/blogs/update/${blogId}`, blogPayload);
          alert('Blog updated successfully')
          navigate('/manage-blogs'); // Navigate to the blog management page after submission
        } else {
          // Add the new blog to the database
          const addResponse = await axios.post('http://localhost:4000/api/blogs/add', blogPayload);
          alert('Blog added successfully')
          navigate('/manage-blogs'); // Navigate to the blog management page after submission
        }
      }
  
      // navigate('/manage-blogs'); // Navigate to the blog management page after submission
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error, display a message, etc.
    }
  };
  

  // Fetch initial blog data if editing an existing blog
  useEffect(() => {
    if (blogId) {
      fetchBlogDataById(blogId);
    }
  }, [blogId]);

  // Function to fetch blog data based on ID (replace with your actual API call)
  const fetchBlogDataById = async (blogId) => {
    try {
      const response = await axios.get(`${serverUrl}/api/cars/${blogId}`);
      const blog = response.data.blog
    
      if (blog) {
        setBlogData(blog);
        setImageUploaded(true); // Set imageUploaded to true when editing an existing blog
      } else {
        // Handle case when blog with specified ID is not found
        console.log(`Blog with ID ${blogId} not found`);
      }
    } catch (error) {
      // Handle error
      console.error('Error fetching blog data:', error);
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
        {/* Image display box */}
        <div className="mb-4 relative">
          <label htmlFor="img" className="block text-gray-700 font-bold mb-2">
            Image:
          </label>
          <div className="mb-4 w-32 h-32 bg-gray-200 border border-gray-300 flex items-center justify-center">
            {imageUploaded && blogData.img && (
              <img
                src={blogData.img}
                alt="Blog"
                className="w-full h-full object-cover"
              />
            )}
            {!imageUploaded && !blogData.imgFile && (
              <span className="text-gray-500">Add Image</span>
            )}
          </div>
          {/* File input for image */}
          <input
            type="file"
            id="img"
            name="img"
            onChange={handleInputChange}
            className=""
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
