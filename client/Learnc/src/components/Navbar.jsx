import React, { useState } from 'react';
import { FiSearch, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutTeacher, logoutStudent, } from '../Redux/Slice/authSlice';
import { fetchSearchResults } from '../Redux/Slice/SearchSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setsearchQuery] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isStudentAuthenticated, isTeacherAuthenticated } = useSelector(state => state.auth)
  const profilePath = isTeacherAuthenticated ? '/teacherprofile' : isStudentAuthenticated ? '/studentprofile' : '/profile';

  const handleSearch = (e) => {
    e.preventDefault();
    const searchPayload = { q: searchQuery }; 
    dispatch(fetchSearchResults(searchPayload)).then((result) => {
      if (result.type === 'search/fetchSearchResults/fulfilled') {
        console.log('Successfully fetched search results:', result.payload);
        navigate('/searchresults'); // Navigate only on success
      } else {
        console.error('Search failed:', result.payload);
        // Optionally, you can display the error to the user
        alert(`Search failed: ${result.payload.error || 'An unknown error occurred.'}`);
      }
    });
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    if (isStudentAuthenticated) {
      dispatch(logoutStudent());
    } else if (isTeacherAuthenticated) {
      dispatch(logoutTeacher());
    }
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className=" font-extrabold text-3xl text-white ">
                EdAtHome
              </h1>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                    Home
                  </Link>
                  <Link to="/courses" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                    Courses
                  </Link> 
                  <Link to="/about" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                    About Us
                  </Link>
                  <Link to="/contact" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <div className="relative flex items-center space-x-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-300" />
                  </div>
                  <input
                    className="bg-indigo-700 text-white placeholder-gray-300 block w-full pl-10 pr-3 py-2 rounded-md leading-5 focus:outline-none focus:bg-indigo-800 focus:ring-2 focus:ring-white focus:border-white sm:text-sm transition-colors duration-300"
                    type="search"
                    placeholder="Search courses"
                    value={searchQuery}
                    onChange={(e) => (setsearchQuery(e.target.value))}
                  />
                  <button onClick={handleSearch} className="bg-indigo-700 text-white hover:bg-indigo-800 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                    Search
                  </button>
                </div>


                {isStudentAuthenticated || isTeacherAuthenticated ? (
                  <div className="relative">
                    <button
                      className="bg-indigo-700 p-1 rounded-full text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white transition-colors duration-300"
                      onClick={toggleProfileDropdown}
                    >
                      <span className="sr-only">View profile</span>
                      <FiUser className="h-6 w-6" />
                    </button>
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1">
                        <Link to={profilePath}>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Profile
                          </button>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/signup">
                    <button className="bg-indigo-700 text-white hover:bg-indigo-800 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                className="bg-indigo-700 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white transition-colors duration-300"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
                Home
              </Link>
              <Link to="/courses" className="text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
                Courses
              </Link>
              <Link to="/about" className="text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
                About Us
              </Link>
              <Link to="/contact" className="text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
                Contact Us
              </Link>
              {!isStudentAuthenticated || isTeacherAuthenticated && (
                <Link to="/signup">
                  <button className="block w-full text-left px-4 py-2 text-sm text-white bg-indigo-700 hover:bg-indigo-800 transition-colors duration-300">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <div>{children}</div>
    </div>
  );
};

export default Navbar;
