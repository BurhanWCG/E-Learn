import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAuthorCourses, deleteCourse } from '../Redux/Slice/createCourseSlice'; // Ensure you have deleteCourse action
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const TeacherProfile = () => {
  const { teacherLoginData, isTeacherAuthenticated } = useSelector((state) => state.auth);
  const { authorCourses } = useSelector((state) => state.course);
  const dispatch = useDispatch();


  useEffect(() => {
    if (isTeacherAuthenticated) {
      dispatch(fetchAuthorCourses());
    }
  }, [dispatch, isTeacherAuthenticated]);


  const handleDelete = (id, enrolmentCount) => {
    const token = localStorage.getItem('teacherToken');
  
    if (enrolmentCount > 0) {
      
      Swal.fire({
        title: 'Action Denied',
        text: 'You can’t delete this course because it has many students enrolled.',
        icon: 'error',
        confirmButtonText: 'Understood',
       
      });
    } else {
      
      Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          
          dispatch(deleteCourse({ id, token }))
            .then(() => {
              dispatch(fetchAuthorCourses()); 
              Swal.fire('Deleted!', 'Your course has been deleted.', 'success');
            })
            .catch((error) => {
              console.error("Failed to delete course:", error);
              Swal.fire('Error!', 'There was a problem deleting the course.', 'error');
            });
        }
      });
    }
  };
  
  if (!isTeacherAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-700">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 flex">
      {/* Left Sidebar for Profile Information */}
      <aside className="w-1/4 bg-white shadow-lg rounded-lg p-6 m-8">
        <div className="flex flex-col items-center">
          <img
            src={teacherLoginData?.profileImage || 'https://via.placeholder.com/150'}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-lg object-cover mb-4"
          />
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Hello, {teacherLoginData?.username}</h1>
          <p className="text-gray-600">{teacherLoginData?.email}</p>
          <p className="text-gray-500">Institution: {teacherLoginData?.institution || 'N/A'}</p>
          <p className="mt-4 text-gray-700">{teacherLoginData?.bio || "This teacher hasn't provided a bio yet."}</p>
          <button className="mt-6 bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition duration-300">
            Edit Profile
          </button>
        </div>
      </aside>

      {/* Right Section for Courses, Management, and Payment History */}
      <main className="flex-1 p-6 m-8">
        {/* Courses Section */}
        <section className="my-8">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Current Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {authorCourses?.length > 0 ? (
              authorCourses.map((course) => (
                <div key={course.id} className="bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out">
                  <img
                    src={course.profile_picture} // Replace with actual data structure
                    alt={course.title}
                    className="w-full h-56 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 hover:text-teal-600 transition-colors duration-300">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mt-3 text-sm leading-relaxed">{course.description}</p>
                    <div className="flex justify-between items-center mt-6">
                      <button
                        onClick={() => handleDelete(course.id, course.enrolment_count)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-300 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="mt-4 text-teal-600 font-semibold hover:text-teal-800 inline-block transition-colors duration-300">
                      Total Enrolment: <span className="font-bold">{course.enrolment_count}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center text-xl">No courses available.</p>
            )}
          </div>

        </section>

        {/* Sticky Launch Course Button */}
        <div className="fixed bottom-10 right-10">
          <Link to="/createcourse">
            <button className="bg-teal-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-teal-700 transition duration-300">
              Create or Launch Course
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default TeacherProfile;
