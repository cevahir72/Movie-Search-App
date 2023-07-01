import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const movieUrl = process.env.REACT_APP_MOVIE_URL;
const apikey = process.env.REACT_APP_API_KEY;

const initialState = {
  movies: [],
  movie: {},
  loading: false
}
console.log(movieUrl)
export const getMovies = createAsyncThunk("movie/getMovies", async (data, thunkAPI)=> {

  try {
      const response = await axios.request({
        method: 'GET',
        url: `${movieUrl}` ,
        params: {
          title: data,
          page: '1'
        },
        headers: {
          'X-RapidAPI-Key': `${apikey}` ,
          'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
        }
      })
      if(response.status === 200) {
        console.log(response)
        return response.data.results;
      }

     }catch (error) {
        console.error(error);
     }
    
})


export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers: {
    [getMovies.pending]: (state, action) => {
      state.loading = true;
    },
    [getMovies.rejected]: (state, action) => {
      state.loading = false;
    },
    [getMovies.fulfilled]: (state, action) => {
      state.loading = false;
      state.movies = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = movieSlice.actions

export default movieSlice.reducer