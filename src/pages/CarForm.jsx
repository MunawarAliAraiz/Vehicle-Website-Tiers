import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios
import { cars } from "../utils/carsData";
import { serverUrl } from "../utils/serverUrl";

const CarForm = () => {
  const { carId } = useParams();
  const navigate = useNavigate();

  // State for car data
  const [carData, setCarData] = useState({
    imgFile: null,
    name: "",
    img: "",
    model: "",
    price: "",
    no: "",
    registeredIn: "",
    color: "",
    assembly: "",
    engineCapacity: "",
    bodyType: "",
    carType: "",
    additionalDetails: "",
    createdAt: null,
    updatedAt: null,
  });

  // State to track whether an image is uploaded
  const [imageUploaded, setImageUploaded] = useState(false);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    // If the input is a file input, use the selected file
    const file = name === "img" ? files[0] : null;

    setCarData((prevData) => ({
      ...prevData,
      [name]: name === "img" ? URL.createObjectURL(files[0]) : value,
    }));

    // Set imageUploaded to true when an image is selected
    if (name === "img" && file) {
      setImageUploaded(true);
      setCarData((prevData) => ({
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
      if (carData.imgFile) {
        // Step 1: Upload the image to the server
        const imageFormData = new FormData();
        imageFormData.append("car_image", carData.imgFile);

        const uploadResponse = await axios.post(
          "http://localhost:4000/api/upload/car/",
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Extract the image URL from the response
        const imageUrl = uploadResponse.data.car.url;

        // Update the car entry with the new image URL
        const carPayload = {
          name: carData.name,
          img: imageUrl,
          model: carData.model,
          price: carData.price,
          no: carData.no,
          registeredIn: carData.registeredIn,
          color: carData.color,
          assembly: carData.assembly,
          engineCapacity: carData.engineCapacity,
          bodyType: carData.bodyType,
          carType: carData.carType,
          additionalDetails: carData.additionalDetails,
        };

        if (carId) {
          // Update the car in the database
          const updateResponse = await axios.put(
            `http://localhost:4000/api/cars/update/${carId}`,
            carPayload
          );
          alert("Car updated successfully");
          navigate("/manage-cars"); // Navigate to the car management page after submission
        } else {
          // Add the new car to the database
          const addResponse = await axios.post(
            "http://localhost:4000/api/cars/add",
            carPayload
          );
          alert("Car added successfully");
          navigate("/manage-cars"); // Navigate to the car management page after submission
        }
      } else {
        // No new image selected, update the car without changing the image
        const carPayload = {
          name: carData.name,
          img: carData.img,
          model: carData.model,
          price: carData.price,
          no: carData.no,
          registeredIn: carData.registeredIn,
          color: carData.color,
          assembly: carData.assembly,
          engineCapacity: carData.engineCapacity,
          bodyType: carData.bodyType,
          carType: carData.carType,
          additionalDetails: carData.additionalDetails,
        };

        if (carId) {
          // Update the car in the database
          const updateResponse = await axios.put(
            `http://localhost:4000/api/cars/update/${carId}`,
            carPayload
          );
          alert("Car updated successfully");
          navigate("/manage-cars"); // Navigate to the car management page after submission
        } else {
          // Add the new car to the database
          const addResponse = await axios.post(
            "http://localhost:4000/api/cars/add",
            carPayload
          );
          alert("Car added successfully");
          navigate("/manage-cars"); // Navigate to the car management page after submission
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error, display a message, etc.
    }
  };

  // Fetch initial car data if editing an existing car
  useEffect(() => {
    if (carId) {
      fetchCarDataById(carId);
    }
  }, [carId]);

  // Function to fetch car data based on ID (replace with your actual API call)
  const fetchCarDataById = async (carId) => {
    try {
      const response = await axios.get(`${serverUrl}/api/cars/${carId}`);
      const car = response.data.car
      
      if (car) {
        setCarData(car);
        setImageUploaded(true); // Set imageUploaded to true when editing an existing blog
      } else {
        // Handle case when blog with specified ID is not found
        console.log(`Blog with ID ${carId} not found`);
      }
    } catch (error) {
      // Handle error
      console.error('Error fetching car data:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Back to Home Link */}
      <p
        className="text-blue-500 cursor-pointer hover:underline mb-4 pl-2"
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#f0f4f8",
          display: "inline-block",
          borderRadius: "0.25rem",
        }}
      >
        ← Back to All Cars
      </p>
      <h2 className="text-2xl font-bold mb-4">
        {carId ? "Edit Car" : "Add Car"}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Image display box */}
        <div className="mb-4 relative">
          <label htmlFor="img" className="block text-gray-700 font-bold mb-2">
            Image:
          </label>
          <div className="mb-4 w-32 h-32 bg-gray-200 border border-gray-300 flex items-center justify-center">
            {imageUploaded && carData.img && (
              <img
                src={carData.img}
                alt="Car"
                className="w-full h-full object-cover"
              />
            )}
            {!imageUploaded && !carData.imgFile && (
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

        {/* Input fields for car data */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Car Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={carData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="model" className="block text-gray-700 font-bold mb-2">
            Model:
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={carData.model}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={carData.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="no" className="block text-gray-700 font-bold mb-2">
            License Plate:
          </label>
          <input
            type="text"
            id="no"
            name="no"
            value={carData.no}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="registeredIn"
            className="block text-gray-700 font-bold mb-2"
          >
            Registered In:
          </label>
          <input
            type="text"
            id="registeredIn"
            name="registeredIn"
            value={carData.registeredIn}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="color" className="block text-gray-700 font-bold mb-2">
            Color:
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={carData.color}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="assembly"
            className="block text-gray-700 font-bold mb-2"
          >
            Assembly:
          </label>
          <input
            type="text"
            id="assembly"
            name="assembly"
            value={carData.assembly}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="engineCapacity"
            className="block text-gray-700 font-bold mb-2"
          >
            Engine Capacity:
          </label>
          <input
            type="text"
            id="engineCapacity"
            name="engineCapacity"
            value={carData.engineCapacity}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="bodyType"
            className="block text-gray-700 font-bold mb-2"
          >
            Body Type:
          </label>
          <input
            type="text"
            id="bodyType"
            name="bodyType"
            value={carData.bodyType}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="carType"
            className="block text-gray-700 font-bold mb-2"
          >
            Car Type:
          </label>
          <input
            type="text"
            id="carType"
            name="carType"
            value={carData.carType}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="additionalDetails"
            className="block text-gray-700 font-bold mb-2"
          >
            Additional Details:
          </label>
          <textarea
            id="additionalDetails"
            name="additionalDetails"
            value={carData.additionalDetails}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {carId ? "Update Car" : "Add Car"}
        </button>
      </form>
    </div>
  );
};

export default CarForm;
