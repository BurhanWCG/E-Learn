// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';  // Ensure paths are correct
import courseReducer from './Slice/createCourseSlice';  // Ensure paths are correct
import searchReducer from'./Slice/SearchSlice'
import paymentsReducer from './Slice/PaymentSlice'

const store = configureStore({
  reducer: {
    search : searchReducer,
    auth: authReducer,
    course : courseReducer,
    payments:paymentsReducer,
   
    
  },
});

export default store;

