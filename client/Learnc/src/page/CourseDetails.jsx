import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/course/courses/${id}/`);
        setCourse(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleConfirmPurchase = () => {
    console.log('Purchase confirmed for course:', course.title);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching course details.</p>;

  return (
    <div className="container mx-auto p-4">
      {course ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={course.profile_picture}
            alt={course.title}
            className="w-full h-96 object-cover "
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <p className="text-gray-600 mb-4"><strong>Category:</strong> {course.category}</p>
            <p className="text-gray-600 mb-4"><strong>Price:</strong> ${course.price}</p>
            <p className="text-gray-600 mb-4"><strong>Created At:</strong> {new Date(course.created_at).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-4"><strong>Instructor:</strong> {course.author}</p>
           <Link to={`/payment/${id}`}
           > <button
              onClick={handleConfirmPurchase}
              className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
            >
              Confirm Purchase
            </button></Link>
          </div>
        </div>
      ) : (
        <p>Course not found.</p>
      )}
    </div>
  );
};

export default CourseDetails;
