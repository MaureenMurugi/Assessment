import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OceanBackground from '../assets/blueBackground.jpg'

const Home = () => {
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ users: 0, countries: 0, photos: 0 });

  useEffect(() => {
    const fetchStatsAndPhotographers = async () => {
      try {
        setLoading(true);

        const [usersResponse, photosResponse, albumsResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/photos'),
          fetch('https://jsonplaceholder.typicode.com/albums')
        ]);

        if (!usersResponse.ok || !photosResponse.ok || !albumsResponse.ok) {
          throw new Error('Failed to fetch data for statistics.');
        }

        const usersData = await usersResponse.json();
        const photosData = await photosResponse.json();
        const albumsData = await albumsResponse.json();

        const uniqueCountries = new Set(albumsData.map(album => album.title));

        setStats({
          users: usersData.length,
          countries: uniqueCountries.size,
          photos: photosData.length
        });

        const sortedPhotographers = usersData.sort((a, b) => b.id - a.id).slice(0, 5);
        const photographersWithImages = sortedPhotographers.map(p => ({
          ...p,
          imageUrl: `https://via.placeholder.com/150/1C3C58?text=${p.name.split(' ')[0]}`
        }));

        setPhotographers(photographersWithImages);

      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatsAndPhotographers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <div className="text-xl font-semibold">Loading the world...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <Link to="/album" className="text-white text-lg font-semibold tracking-wider hover:text-indigo-400 transition-colors duration-300">
          ALBUMS
        </Link>
        <span className="text-white text-3xl font-extrabold tracking-widest hover:text-indigo-400 transition-colors duration-300">
          INTO THE LENSES
        </span>
      </nav>

      {/* Header with Headline (Ocean Image) */}
      <header className="relative w-full h-96 md:h-[500px] flex items-center justify-center text-center overflow-hidden">
        <img
          src={OceanBackground}
          alt="Ocean background"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-opacity-40 z-10"></div>
        <div className="relative z-20 p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Welcome to the life of a traveler
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-light text-gray-200">
            A Journey into the Lenses
          </p>
        </div>
      </header>
      
      <hr className="my-8 border-t border-gray-700 mx-auto w-1/2" />
      
      {/* About Us Section with Statistics */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
            About "Into the Lenses"
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg mb-12">
            "Into the Lenses" is a collective of globe-trotting photographers dedicated to capturing the raw, breathtaking beauty of our world.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105">
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {stats.users}
              </span>
              <p className="mt-2 text-xl font-semibold text-white">Users</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105">
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
                {stats.countries}
              </span>
              <p className="mt-2 text-xl font-semibold text-white">Countries Photographed</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105">
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                {stats.photos}
              </span>
              <p className="mt-2 text-xl font-semibold text-white">Photos Shared</p>
            </div>
          </div>
        </div>
      </section>
      
      <hr className="my-8 border-t border-gray-700 mx-auto w-1/2" />
      
      {/* Leaderboard Section - Infinity Carousel */}
      <section className="py-20 bg-gray-900 overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Top Photographers
        </h2>
        <div className="flex space-x-8 animate-carousel max-w-full">
          {[...photographers, ...photographers].map((photographer, index) => (
            <div
              key={photographer.id + '-' + index}
              className="relative w-64 flex-shrink-0 bg-gray-800 rounded-xl shadow-xl overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <img
                src={photographer.imageUrl}
                alt={photographer.name}
                className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-1">{photographer.name}</h3>
                <p className="text-sm text-gray-400">{photographer.company.catchPhrase}</p>
                <Link to={`/user/${photographer.id}`} className="mt-4 inline-block text-indigo-400 hover:text-indigo-300 transition-colors">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <hr className="my-8 border-t border-gray-700 mx-auto w-1/2" />
      
      {/* Contact Us Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
            Ready to Share Your Vision?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300 text-lg">
            Join our community of passionate photographers. Create a profile and start sharing your unique perspective with the world.
          </p>
          <div className="mt-8">
            <Link
              to="/user"
              className="inline-block px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-full shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;