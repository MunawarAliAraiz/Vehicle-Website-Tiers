import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.jpg'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    // Validation logic (you may add more sophisticated validation)
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Handle login logic (you may send a request to your server for authentication)
    // ...

    // Reset form
    setEmail('');
    setPassword('');
    setError('');
    navigate('/dashboard')

  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="h-screen w-screen flex items-center justify-center">
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
