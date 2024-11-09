// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for student signup
export const signupStudent = createAsyncThunk(
  'auth/signupStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/account/studentsignup/', studentData); // Student signup endpoint
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message || 'Signup failed');
      }
    }
  }
);

// Async thunk for teacher signup
export const signupTeacher = createAsyncThunk(
  'auth/signupTeacher',
  async (teacherData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/account/teachersignup/', teacherData); // Teacher signup endpoint
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message || 'Signup failed');
      }
    }
  }
);

// Async thunk for student login
export const loginStudent = createAsyncThunk(
  'auth/loginStudent',
  async (studentLoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/account/login/', studentLoginData); // Student login endpoint
      console.log(response.data)
      return response.data; // Return the response data with token and user info
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response && error.response.data)
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message || 'Login failed');
      }
    }
  }
);

// Async thunk for teacher login
export const loginTeacher = createAsyncThunk(
  'auth/loginTeacher',
  async (teacherLoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/account/teacherlogin/', teacherLoginData); // Teacher login endpoint
      console.log(response.data)
      return response.data; // Return the response data with token and user info
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message || 'Login failed');
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    studentSignupData: null,
    teacherSignupData: null,
    studentLoginData: null,
    teacherLoginData: null,
    studentToken: null,
    teacherToken: null,
    isStudentLoading: false,
    isTeacherLoading: false,
    studentError: null,
    teacherError: null,
    isStudentAuthenticated: false,
    isTeacherAuthenticated: false,
    role: null,
  },
  reducers: {
    logoutStudent: (state) => {
      state.studentLoginData = null;
      state.studentToken = null;
      state.isStudentAuthenticated = false;
      localStorage.removeItem('studentToken');
       
    },
    logoutTeacher: (state) => {
      state.teacherLoginData = null;
      state.teacherToken = null;
      state.isTeacherAuthenticated = false;
      localStorage.removeItem('teacherToken'); 
      
    },
  },
  extraReducers: (builder) => {
    // Student Signup
    builder
      .addCase(signupStudent.pending, (state) => {
        state.isStudentLoading = true;
        state.studentError = null;
      })
      .addCase(signupStudent.fulfilled, (state, action) => {
        state.isStudentLoading = false;
        state.studentSignupData = action.payload;
        state.isStudentAuthenticated = true;
        
      })
      .addCase(signupStudent.rejected, (state, action) => {
        state.isStudentLoading = false;
        state.studentError = action.payload || 'Student signup failed';
      });

    // Teacher Signup
    builder
      .addCase(signupTeacher.pending, (state) => {
        state.isTeacherLoading = true;
        state.teacherError = null;
      })
      .addCase(signupTeacher.fulfilled, (state, action) => {
        state.isTeacherLoading = false;
        state.teacherSignupData = action.payload;
        state.isTeacherAuthenticated = true;
        
      })
      .addCase(signupTeacher.rejected, (state, action) => {
        state.isTeacherLoading = false;
        state.teacherError = action.payload || 'Teacher signup failed';
      });

    // Student Login
    builder
      .addCase(loginStudent.pending, (state) => {
        state.isStudentLoading = true;
        state.studentError = null;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.isStudentLoading = false;
        state.studentLoginData = action.payload.user;
        state.studentToken = action.payload.token;
        state.isStudentAuthenticated = true;
        state.role = action.payload.user.role 
        localStorage.setItem('studentToken', action.payload.token); // Store student token
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.isStudentLoading = false;
        state.studentError = action.payload || 'Student login failed';
      });

    // Teacher Login
    builder
      .addCase(loginTeacher.pending, (state) => {
        state.isTeacherLoading = true;
        state.teacherError = null;
      })
      .addCase(loginTeacher.fulfilled, (state, action) => {
        state.isTeacherLoading = false;
        state.teacherLoginData = action.payload.user;
        state.teacherToken = action.payload.token;
        state.isTeacherAuthenticated = true;
        state.role = action.payload.user.role;
        localStorage.setItem('teacherToken', action.payload.token); // Store teacher token
      })
      .addCase(loginTeacher.rejected, (state, action) => {
        state.isTeacherLoading = false;
        state.teacherError = action.payload || 'Teacher login failed';
      });
  },
});

// Export the logout actions
export const { logoutStudent, logoutTeacher } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
