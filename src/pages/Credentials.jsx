import React, { useState } from 'react';
import bg from '../assets/bg.jpg'

const Credentials = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    // Validation logic
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Handle password change logic
    // ...

    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="h-screen w-screen flex items-center justify-center">
      <div className="container w-auto p-10 border border-black rounded-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Change Credentials</h2>

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
