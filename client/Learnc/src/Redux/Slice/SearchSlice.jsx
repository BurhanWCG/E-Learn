
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit'

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (searchPayload, { rejectWithValue }) => {
    try {
    const response = await axios.post('http://localhost:8000/course/search/', searchPayload,
    { headers: { 'Content-Type': 'application/json' }});
    console.log('Fetching search results for:', response.data);
      return response.data; 
    } catch (error) {
      console.log('slice error')
      return rejectWithValue(error.response.data); // Return the error if the request fails
    }
  }
);

const SearchSlice = createSlice({
    name: 'search',
    initialState: {
      searchResults: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchSearchResults.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchSearchResults.fulfilled, (state, action) => {
          state.loading = false;
          state.searchResults = action.payload;
        })
        .addCase(fetchSearchResults.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default SearchSlice.reducer;
