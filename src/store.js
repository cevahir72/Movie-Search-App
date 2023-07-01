import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./services/authSlice";
import movieReducer from "./services/movieSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer
  },
})