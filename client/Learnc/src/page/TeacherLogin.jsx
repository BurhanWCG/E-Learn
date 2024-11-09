import React from 'react'
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginTeacher } from '../Redux/Slice/authSlice';
import { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const TeacherLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [userform, setUserform] = useState({
    email: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    e.preventDefault()
    setUserform({ ...userform, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginTeacher(userform)).then((result) => {
      if (result.type === 'auth/loginTeacher/fulfilled') {
        Swal.fire({
          title: 'Success!',
          text: 'You Have Login Succesfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate("/teacherprofile")
      }
      else if (result.type === 'auth/loginTeacher/fulfilled') {
        // Show a toast for invalid credentials
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Invalid Credentials',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    })
  };

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold text-indigo-800 mb-4">Welcome Back, Educator!</h1>
            <p className="text-xl text-gray-700 mb-6">
              Log in to manage your courses and connect with students.
            </p>
            <a
              href="#"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
            >
              View Your Courses
            </a>
          </div>
          <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Teacher Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name='email'
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                    value={userform.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name='password'
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="••••••••"
                    value={userform.password}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TeacherLogin;
