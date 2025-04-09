import React from 'react';
import { FiSearch, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [featuredCourse, setfeaturedCourse] = useState([])

  useEffect(() => {
    const fetchTopCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/course/featured_course/');
        setfeaturedCourse(response.data);
      } catch (error) {
        console.error('Error fetching top courses:', error);
      }
    };

    fetchTopCourses();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-500 to-indigo-600 h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Learn Anytime, Anywhere
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Start your journey with the best online courses.
          </p>
          <Link to='/courses'><button className="bg-white text-indigo-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition duration-300">
            Explore Courses
          </button></Link>
        </div>
        <div className="absolute bottom-20 w-full text-center p-4">
          <FiSearch className="text-white mx-auto h-8 w-8 animate-bounce" />
        </div>
      </header>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredCourse.map((course) => (
              <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={`http://localhost:8000${course.profile_picture}`}
                  height={200}
                  width={300}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {course.description}
                  </p>
                  <button className="text-indigo-600 hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Registration Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Join Our Team of Experts</h2>
          <p className="text-lg mb-6">
            Are you passionate about teaching and sharing your expertise with others? Become an instructor at E-Learn and help shape the future of education.
          </p>
          <Link
            to="/teacher-signup"
            className="bg-white text-indigo-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Register as a Teacher
          </Link>
        </div>
      </section>

      {/* Sign In Options Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Already Have an Account?</h2>
          <p className="text-lg mb-6">
            Sign in to your account to access your courses or manage your teaching profile.
          </p>
          <div className="flex justify-center gap-4">

            <Link
              to="/teacher-login"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
            >
              Teacher Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-12">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-500 p-6 rounded-lg">
              <p className="mb-4">
                "This platform has changed the way I learn. The courses are top-notch and the instructors are fantastic!"
              </p>
              <p className="font-bold ">- Sajid Jahan Tofayel</p>

            </div>
            <div className="bg-indigo-500 p-6 rounded-lg">
              <p className="mb-4">
                "I love how easy it is to find courses that match my interests."
              </p>
              <p className="font-bold">- John Smith</p>
            </div>
            <div className="bg-indigo-500 p-6 rounded-lg">
              <p className="mb-4">
                "Highly recommend this platform for anyone looking to learn something new."
              </p>
              <p className="font-bold">- Emily Johnson</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-indigo-700 py-6 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p>&copy; 2024 E-Learn. All rights reserved.</p>
            <div className="space-x-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
