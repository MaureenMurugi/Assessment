import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hardcoded list of existing user emails for validation
// In a real application, this would be a check against a database
const existingUsers = [
  'testuser@example.com',
  'john.doe@example.com',
  'jane.smith@example.com'
];

const User = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    description: '',
    countries: '',
    samplePhotos: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Check if the email already exists
    if (existingUsers.includes(formData.email)) {
        setIsSuccess(false);
        setMessage('A user with this email already exists. Please use a different email or log in.');
        return;
    }

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setIsSuccess(false);
      setMessage('Passwords do not match. Please try again.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          username: formData.email,
          password: formData.password,
          company: { catchPhrase: formData.description },
          address: { city: formData.countries },
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newUser = await response.json();
      console.log('New profile created:', newUser);
      
      setIsSuccess(true);
      setMessage('Profile created successfully! Navigating to home...');
      
      setTimeout(() => {
        navigate('/home');
      }, 3000);

    } catch (error) {
      console.error('Failed to create profile:', error);
      setIsSuccess(false);
      setMessage('Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 shadow-2xl rounded-xl w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left Section - Intro */}
        <div className="flex-1 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-gray-700 md:rounded-l-xl md:rounded-r-none rounded-t-xl">
          <h2 className="text-4xl font-extrabold text-white mb-4">Join Our Journey</h2>
          <p className="mt-2 text-lg text-gray-300">
            Share your unique perspective with a global community of travelers. We can't wait to see the world through your lens.
          </p>
          <p className="mt-6 text-sm text-gray-400">
            *Note: This is a demo. Your profile will be created, but data will not be permanently stored.
          </p>
        </div>

        {/* Right Section - Profile Form */}
        <div className="flex-1 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Create Your Profile
          </h3>
          
          {message && (
            <div className={`p-3 mb-4 rounded-lg text-center ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {/* New Password and Confirm Password fields */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {/* End of new fields */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">Photography Style (Description)</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                required
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>
            <div>
              <label htmlFor="countries" className="block text-sm font-medium text-gray-300">Countries Photographed</label>
              <input
                id="countries"
                name="countries"
                type="text"
                required
                placeholder="e.g., Kenya, Spain, Japan"
                value={formData.countries}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label htmlFor="samplePhotos" className="block text-sm font-medium text-gray-300">Sample Photos (URL)</label>
              <input
                id="samplePhotos"
                name="samplePhotos"
                type="url"
                placeholder="e.g., https://unsplash.com/your-photo.jpg"
                value={formData.samplePhotos}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition duration-150 ease-in-out ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600'}`}
            >
              {loading ? 'Creating Profile...' : 'Create Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
