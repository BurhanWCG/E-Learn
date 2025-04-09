import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../Redux/Slice/SearchSlice';
import { Link, useLocation } from 'react-router-dom';

const SearchResult = () => {
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector((state) => state.search);
  const location = useLocation();

  // Extract the search query from the URL, e.g., "/searchresults?q=course"
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchSearchResults({ q: searchQuery }));
    }
  }, [dispatch, searchQuery]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.detail || 'Something went wrong!'}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Search Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {searchResults.length > 0 ? (
          searchResults.map((course) => (
            <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={`http://localhost:8000${course.profile_picture}`}
                alt={course.title}
                height={200}
                width={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <Link to={`/details/${course.id}`} className="text-indigo-600 hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
