import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  return (
    <div>
      <header className="bg-wgite shadow-lg h-64 flex items-center justify-center text-white">
        <h1 className="text-4xl text-black md:text-5xl font-bold">Contact Us</h1>
      </header>

      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Get in Touch</h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            We’d love to hear from you! Reach out to us with any questions, suggestions, or feedback.
          </p>

          <div className="flex flex-col md:flex-row md:justify-center gap-8 text-center">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <FiMail className="text-indigo-600 mx-auto h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">it21002@mabstu.ac.bd</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8">
              <FiPhone className="text-indigo-600 mx-auto h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">01761964601</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8">
              <FiMapPin className="text-indigo-600 mx-auto h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">1208 EdAtHome Ave, Dhaka</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-8">Send Us a Message</h2>
          <form className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-gray-900">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input type="text" id="name" className="w-full mt-2 p-3 border rounded-md" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input type="email" id="email" className="w-full mt-2 p-3 border rounded-md" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea id="message" rows="4" className="w-full mt-2 p-3 border rounded-md"></textarea>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
