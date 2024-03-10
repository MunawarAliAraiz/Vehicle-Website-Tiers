import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import bg from '../assets/bg.jpg';

const serverUrl = 'http://localhost:4000';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    // Validation logic (you may add more sophisticated validation)
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      // Send a request to your server for authentication
      const response = await fetch(`${serverUrl}/api/users/adminpanellogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in cookies
        Cookies.set('adminToken', data.token, { expires: 1 / 24 }); // Expires in 1 hour

        // Reset form and navigate to dashboard
        setEmail('');
        setPassword('');
        setError('');
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('An error occurred during login');
    }
  };

  

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="bg-cover h-screen w-screen flex items-center justify-center">
      <div className="container w-auto p-10 border border-black rounded-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {error && <span className="text-red-500">{error}</span>}
        </div>

        {/* Show/Hide Password */}
        <div className="password-toggle mb-4">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={handleShowPassword}
            className="mr-2"
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>

        {/* Login Button */}
        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
