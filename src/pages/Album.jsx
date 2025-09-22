import React, { useState, useEffect } from 'react';

const Album = () => {
  const [allPhotos, setAllPhotos] = useState([]);
  const [displayedPhotos, setDisplayedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3001/photos');
        if (!response.ok) {
          throw new Error('Failed to fetch photos from local server.');
        }

        const data = await response.json();
        
        const photosWithState = data.map(photo => ({
          ...photo,
          isLiked: false
        }));

        setAllPhotos(photosWithState);
        setDisplayedPhotos(photosWithState);
      } catch (e) {
        setError(e.message);
        setAllPhotos([]);
        setDisplayedPhotos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newQuery = e.target.elements.search.value.toLowerCase();
    
    const filteredPhotos = allPhotos.filter(photo =>
      photo.title.toLowerCase().includes(newQuery) ||
      photo.photographer.toLowerCase().includes(newQuery) ||
      photo.country.toLowerCase().includes(newQuery)
    );
    
    setQuery(newQuery);
    setDisplayedPhotos(filteredPhotos);
  };

  const handleLike = (id) => {
    const newAllPhotos = allPhotos.map(photo =>
      photo.id === id ? { ...photo, isLiked: !photo.isLiked } : photo
    );
    setAllPhotos(newAllPhotos);
    
    const newDisplayedPhotos = displayedPhotos.map(photo =>
      photo.id === id ? { ...photo, isLiked: !photo.isLiked } : photo
    );
    setDisplayedPhotos(newDisplayedPhotos);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading photos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Local Photo Gallery</h1>
        <p className="text-lg text-indigo-600 font-semibold">
          Explore amazing photography from around the world.
        </p>
      </div>

      <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-10">
        <div className="flex rounded-full overflow-hidden shadow-lg">
          <input
            type="search"
            name="search"
            placeholder="Search by title, photographer, or country..."
            className="w-full px-6 py-3 text-lg text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 font-semibold hover:bg-indigo-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {error && (
        <div className="text-center text-red-600 font-semibold text-lg p-4">
          {error}
        </div>
      )}
      
      {displayedPhotos.length === 0 && !loading && !error && (
        <div className="text-center text-gray-500 text-lg p-4">
          No photos found for "{query}".
        </div>
      )}

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 mx-auto max-w-7xl">
        {displayedPhotos.map(photo => (
          <div key={photo.id} className="relative group break-inside-avoid-column">
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full rounded-lg shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            
            {/* The badge container now has a transparent background */}
            <div className="absolute inset-0 rounded-lg flex flex-col justify-between p-4">
              <div className="flex justify-end">
                <button
                  onClick={() => handleLike(photo.id)}
                  className="bg-white p-2 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none"
                >
                  {photo.isLiked ? (
                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 017.5 3c2.27 0 4.5 1.73 5.5 3.5.5-1.77 2.73-3.5 5.5-3.5A5.5 5.5 0 0122 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-.318-.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 text-white">
                <span className="bg-gray-800 bg-opacity-75 rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  <span>{photo.photographer}</span>
                </span>
                <span className="bg-gray-800 bg-opacity-75 rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 01-2-2zm9-12l2 2m0 0l2-2m-2 2v2M18 9l2 2m0 0l2-2m-2 2v2M20 18v-2"/></svg>
                  <span>{photo.country}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;