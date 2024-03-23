import React, { useState } from 'react';
import bg from '../assets/bg.jpg';
import Cookies from 'js-cookie';
import { serverUrl } from '../utils/serverUrl';

const Credentials = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    // Validation logic
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      // Send a request to change admin password
      const response = await fetch(`${serverUrl}/api/users/adminchangepassword`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('adminToken'),
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setError('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error during password change:', error.message);
      setError('An error occurred during password change');
      setSuccessMessage('');
    }
  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="h-screen w-screen flex items-center justify-center">
      <div className="container w-auto p-10 border border-black rounded-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Change Admin Password</h2>

        {/* Current Password */}
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* New Password */}
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {error && <span className="text-red-500">{error}</span>}
          {successMessage && <span className="text-green-500">{successMessage}</span>}
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

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Credentials;
