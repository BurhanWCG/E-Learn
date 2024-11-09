import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { makePayment } from '../Redux/Slice/PaymentSlice';
import { useNavigate } from 'react-router-dom';

const PaymentGateway = () => {
  const { id } = useParams();
  const dispatch = useDispatch(); // Move useDispatch outside of handlePayment
  const token = localStorage.getItem('studentToken');
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [accountNumber, setaccountNumber] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();
    console.log(id,token)
    dispatch(makePayment({ id, accountNumber, token })).then((result) => {
      if (result.type === 'payments/makePayment/fulfilled') {
        Swal.fire({
          title: 'Success!',
          text: 'Payment was successful!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/studentprofile')
      } else if (result.payload && result.payload.status === 409) {
        Swal.fire({
          title: 'Purchase Denied',
          text: 'You have already purchased this course.',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Payment failed. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });

      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Payment Details</h2>

        <form onSubmit={handlePayment}>
          {/* Card Number */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="card-number">
              Card Number
            </label>
            <input
              onChange={(e) => setaccountNumber(e.target.value)}
              type="text"
              value={accountNumber}
              id="card-number"
              name='accountNumber'
              placeholder="1234 5678 9101 1121"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          {/* Expiration Date and CVV */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="expiry-date">
                Expiration Date
              </label>
              <input
                type="text"
                id="expiry-date"
                name='expiry-date'
                placeholder="MM/YY"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="cvv">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="123"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="payment-method">
              Payment Method
            </label>
            <select
              id="payment-method"
              name="paymentMethod"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {/* Pay Now Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300"
          >
            Pay Now
          </button>

        </form>
      </div>
    </div>
  );
};

export default PaymentGateway;
