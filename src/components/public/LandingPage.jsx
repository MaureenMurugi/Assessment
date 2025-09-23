import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const staticImageUrls = [
  "https://images.unsplash.com/photo-1542051841857-5f9976535a29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTg0NTd8MHwxfHNlYXJjaHwxfHxKYXBhbnxlbnwwfHx8fDE2NzY3ODAzMDM&ixlib=rb-4.0.3&q=80&w=1080",
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTg0NTd8MHwxfHNlYXJjaHwyfHxJdGFseXxlbnwwfHx8fDE2NzY3ODAzMDM&ixlib=rb-4.0.3&q=80&w=1080",
  "https://images.unsplash.com/photo-1555027552-b13c1c9c0b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTg0NTd8MHwxfHNlYXJjaHwzfHxicmF6aWx8ZW58MHx8fHwxNjc2NzgwMzAz&ixlib=rb-4.0.3&q=80&w=1080",
  "https://images.unsplash.com/photo-1596707174676-e41c4d4f8f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTg0NTd8MHwxfHNlYXJjaHw0fHxBdXN0cmFsaWF8ZW58MHx8fHwxNjc2NzgwMzAz&ixlib=rb-4.0.3&q=80&w=1080",
  "https://images.unsplash.com/photo-1559828453-2ce5255c4a4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTg0NTd8MHwxfHxHZ3lwdHxlbnwwfHx8fDE2NzY3ODAzMDM&ixlib=rb-4.0.3&q=80&w=1080",
  "https://images.unsplash.com/photo-1502602898950-8b02441c0975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTg0NTd8MHwxfHNlYXJjaHw2fHxGcmFuY2V8ZW58MHx8fHwxNjc2NzgwMzAz&ixlib=rb-4.0.3&q=80&w=1080"
];

const LandingPage = () => {
  const [travellers, setTravellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(usersData => {
        const travellersWithImages = usersData.map((user, index) => {
          const countries = ["Paris", "Tokyo", "London", "Sydney"];
          const displayCountries = countries.slice(0, 2).join(', '); 

          return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            country: user.address?.city || 'Global Traveler',
            travelledCountries: displayCountries,
            imageUrl: staticImageUrls[index % staticImageUrls.length]
          };
        });

        setTravellers(travellersWithImages);
        setLoading(false);
      })
      .catch(e => {
        console.error("Failed to fetch travellers:", e);
        setError("Failed to load travellers. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleViewWork = () => {
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading travellers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-end mb-8">
          <button
            onClick={handleLogin}
            className="px-6 py-2 rounded-full text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </div>
        
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8 leading-tight">
          Discover Our World Travellers
        </h1>
        <p className="text-xl text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          Explore amazing photography from around the globe. Log in to see individual collections!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {travellers.map((traveller) => (
            <div 
              key={traveller.id} 
              className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
            >
              <img 
                src={traveller.imageUrl} 
                alt={traveller.name} 
                className="w-full h-48 object-cover object-center border-b border-gray-200"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{traveller.name}</h3>
                <p className="text-lg text-indigo-600 font-semibold mb-3">{traveller.country}</p>
                <p className="text-gray-700 text-sm mb-4 flex-grow">
                  A passionate photographer from {traveller.country}, capturing moments in: {traveller.travelledCountries}.
                </p>
                <button
                  onClick={handleViewWork}
                  className="mt-auto w-full bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-0.5 shadow-md"
                >
                  View {traveller.name.split(' ')[0]}'s Work 
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
