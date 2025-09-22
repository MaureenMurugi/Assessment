import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const [travellers, setTravellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

   useEffect(() => {
    //fetch call for all users
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(usersData => {
        // Map over the users and start a new fetch for each user's albums
        const albumFetches = usersData.map(user =>
          fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
            .then(albumResponse => albumResponse.json())
            .then(albumsData => {
              const countries = albumsData
                .map(album => album.title.split(' ')[0])
                .filter((value, index, self) => self.indexOf(value) === index);
              const displayCountries = countries.length > 0 ? countries.join(', ') : 'Various Locations';

              // Return the complete traveller object
              return {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                country: user.address?.city || 'Global Traveler',
                travelledCountries: displayCountries,
                imageUrl: `https://via.placeholder.com/150/CCCCCC/FFFFFF?text=${user.name.split(' ')[0]}`
              };
            })
        );
        
        // Use Promise.all to wait for all album fetches to complete
        return Promise.all(albumFetches);
      })
      .then(travellersWithDetails => {
        setTravellers(travellersWithDetails);
        setLoading(false);
      })
      .catch(e => {
        console.error("Failed to fetch travellers:", e);
        setError("Failed to load travellers. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleViewWork = (travellerName) => {
    // alert(`To view ${travellerName}'s individual work, please log in.`);
    navigate('/login');
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerPage = 3;
  const totalSlides = Math.ceil(travellers.length / cardsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const startIndex = currentSlide * cardsPerPage;
  const visibleTravellers = travellers.slice(startIndex, startIndex + cardsPerPage);

  // Conditional returns for loading and error states must also come before the main return
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8 leading-tight">
          Discover Our World Travellers
        </h1>
        <p className="text-xl text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          Explore amazing photography from around the globe. Log in to see individual collections!
        </p>

        {/* Carousel Container */}
        <div className="relative w-full max-w-6xl mx-auto mb-16">
          {/* Carousel Cards */}
          <div className="flex justify-center items-stretch space-x-6">
            {visibleTravellers.map((traveller) => (
              <div 
                key={traveller.id} 
                className="flex-1 min-w-[280px] max-w-[calc(33.33%-1.5rem)] bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
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
                    onClick={() => handleViewWork(traveller.name)}
                    className="mt-auto w-full bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-0.5 shadow-md"
                  >
                    View {traveller.name.split(' ')[0]}'s Work 
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Buttons */}
          {travellers.length > cardsPerPage && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10 -ml-6"
                aria-label="Previous slide"
              >
                &#10094;
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10 -mr-6"
                aria-label="Next slide"
              >
                &#10095;
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LandingPage