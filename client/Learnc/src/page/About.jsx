import React from 'react';

const About = () => {
  return (
    <div>
      <header className="bg-wgite shadow-lg h-64 flex items-center justify-center text-white">
        <h1 className="text-4xl md:text-5xl text-black font-bold">About Us</h1>
      </header>

      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Our Mission</h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            At E-Learn, our mission is to provide high-quality online education accessible to everyone. We believe that
            learning should be flexible, affordable, and personalized to each student’s needs.
          </p>
          
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Expert Instructors</h3>
              <p className="text-gray-600">Our instructors are industry experts who are passionate about teaching and mentoring students.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Flexible Learning</h3>
              <p className="text-gray-600">Access courses anytime, anywhere, and learn at your own pace.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Community Support</h3>
              <p className="text-gray-600">Join a vibrant community of learners and instructors to enhance your learning journey.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Join Us on Our Journey</h2>
          <p className="text-lg mb-6">
            E-Learn is constantly evolving to bring the best educational resources to learners around the world. 
            Join us and start transforming your future today.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
