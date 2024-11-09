import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchPaymentHistory } from '../Redux/Slice/PaymentSlice';

const StudentProfile = () => {

  const { studentLoginData, isStudentAuthenticated } = useSelector((state) => state.auth);
  const { payments } = useSelector((state) => state.payments)
  const dispatch = useDispatch();

  useEffect(() => {
    if (isStudentAuthenticated) {
      dispatch(fetchPaymentHistory())
    }
  }, [dispatch, isStudentAuthenticated]);

  if (!isStudentAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      {/* Profile Header */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex items-center justify-center">
            <div className='flex text-center flex-col'>
              <h1 className="flex text-3xl font-bold ">Hello, {studentLoginData?.username}</h1>
              <p className="text-xl mt-2">{studentLoginData?.email}</p>
            </div>
          </div>

        </div>
      </section>

      {/* Current Courses */}
      <section className="my-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">Current Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-16 ">
          {payments.length > 0 ? (
            payments.map((course) => (
              <div key={course.id} className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out">

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white hover:text-red-600 transition-colors duration-300">
                    {course.course_title}
                  </h3>

                  <div className='text-white'>Price : {course.amount}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center text-xl">No courses available.</p>
          )}
        </div>

      </section>


      {/* Payment History */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Payment History</h2>

          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Course</th>
                <th className="py-2 px-4 border-b text-left">Transaction</th>
                <th className="py-2 px-4 border-b text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments?.length > 0 ? (
                payments.map((item, index) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 border-b">{item.created_at}</td>
                    <td className="py-2 px-4 border-b">{item.course_title}</td>
                    <td className="py-2 px-4 border-b">{item.transaction_id}</td>
                    <td className="py-2 px-4 border-b">{item.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-4 font-bold text-center">
                    No Payments Yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>


        </div>
      </section>
    </div>
  );
};

export default StudentProfile;
