import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for creating a payment (POST request)
export const makePayment = createAsyncThunk(
  'payments/makePayment',
  async ({ id, accountNumber, token }, { rejectWithValue }) => {
    console.log(accountNumber)
    try {
      const response = await axios.post(`http://127.0.0.1:8000/course/make/${id}/`, 
        { accountNumber }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token for authentication
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        
        if (error.response.status === 409) {
          return rejectWithValue({
            status: 409,
            message: 'You have already purchased this course.',
          });
        } else {
          // Other errors returned by the server
          return rejectWithValue({
            status: error.response.status,
            message: error.response.data.detail || 'An error occurred.',
          });
        }
      } else if (error.request) {
        // Network error
        return rejectWithValue({
          status: 'NETWORK_ERROR',
          message: 'Network error, please try again later.',
        });
      } else {
        // Something else went wrong
        return rejectWithValue({
          status: 'UNKNOWN_ERROR',
          message: 'An unexpected error occurred.',
        });
      }
    }
  }
);

// Thunk for fetching payment history (GET request)
export const fetchPaymentHistory = createAsyncThunk(
  'payments/fetchPaymentHistory',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('studentToken');
      const response = await axios.get('http://127.0.0.1:8000/course/history/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Create the payment slice
const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    payments: [], 
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Handle makePayment actions
    builder
      .addCase(makePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;  // Set success flag to true after successful payment
        state.payments.push(action.payload);  // Optionally, add payment info to the state
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Payment failed. Please try again.';
      });

    // Handle fetchPaymentHistory actions
    builder
      .addCase(fetchPaymentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
