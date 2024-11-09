import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/course/createcourse/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
      
      return response.data; // You can also return response.data if needed
    } catch (error) {
      console.error('Error uploading course:', error.response ? error.response.data : error.message);
      throw rejectWithValue(error.response.data); // Use rejectWithValue to handle errors correctly
    }
  }
);

// Thunk for fetching all courses (GET request)
export const fetchCourses = createAsyncThunk('course/fetchCourses', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/course/getcourses/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const fetchAuthorCourses = createAsyncThunk('course/fetchAuthorCourses', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('teacherToken');
    const response = await axios.get('http://127.0.0.1:8000/course/getmycourses/', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk for deleting a course
export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async ({ id, token }, { rejectWithValue }) => {
    console.log(id)
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/course/edit/${id}/`, {
       
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        
      });
      return id; 
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [], // For storing fetched courses
    studentCourses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle createCourse actions
    builder
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
       
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle fetchCourses actions
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload; // Store the fetched courses
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle fetchAuthorCourses actions
    builder
      .addCase(fetchAuthorCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthorCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.authorCourses = action.payload; // Store the fetched author's courses
      })
      .addCase(fetchAuthorCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


    // Handle deleteCourse actions
    builder
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted course from the state
        state.courses = state.courses.filter(course => course.id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
