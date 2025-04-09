import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { FiBook, FiAlignLeft, FiTag, FiDollarSign, FiImage } from 'react-icons/fi';
import { createCourse } from '../Redux/Slice/createCourseSlice';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    price: "",
    profile_picture: null, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleImageChange = (e) => {
    setCourseData({ ...courseData, profile_picture: e.target.files[0] }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', courseData.title);
    formData.append('description', courseData.description);
    formData.append('category', courseData.category);
    formData.append('price', parseFloat(courseData.price));

    if (courseData.profile_picture) {
      formData.append('profile_picture', courseData.profile_picture);
    }
    
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    const token = localStorage.getItem('teacherToken');

    // Dispatch the create course action with formData
    dispatch(createCourse({ formData, token })).then((result) => {
      if (result.type === 'courses/createCourse/fulfilled') {
        Swal.fire({
          title: 'Success!',
          text: 'You Have Created Course Succesfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate("/teacherprofile");
      }
    }); 
};


  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-4xl font-bold text-indigo-800 mb-6">Create a New Course</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            {/* Existing Fields */}
            {/* Course Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Course Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiBook className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter course title"
                  value={courseData.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* Course Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                Course Description
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiAlignLeft className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="description"
                  name="description"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter course description"
                  value={courseData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* Category */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiTag className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g. Programming, Art"
                  value={courseData.category}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* Price */}
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                Price (USD)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Set a course price"
                  value={courseData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* Course Cover Image */}
            <div className="mb-6">
              <label htmlFor="profile_picture" className="block text-gray-700 text-sm font-bold mb-2">
                Course Cover Image
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiImage className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="file"
                  id="profile_picture"
                  name="profile_picture"
                  accept="image/*"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleImageChange}
                  required
                />
              </div>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateCourse;
