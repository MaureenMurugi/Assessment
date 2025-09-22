import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../assets/login1.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login logic
    if (email && password) {
      // Simulate successful login
      localStorage.setItem('token', 'simulated-token'); // Store a fake token
      alert('Login successful! Navigating to Home page.');
      navigate('/home');
    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        <div className="flex-1 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
            <p className="mt-2 text-lg text-indigo-600 font-semibold">
              Into the lenses of world travellers 📸
            </p>
            <p className="mt-4 text-gray-600">
              Sign in to view individual work and explore their journeys.
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="relative flex-1 hidden md:block">
          <img
            src={loginImage}
            alt="A camera lens with a world map reflected in it, symbolizing travel."
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;