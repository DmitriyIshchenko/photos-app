import { configureStore } from '@reduxjs/toolkit';
import photosSlice from '../features/photos/photosSlice';

export const store = configureStore({
  reducer: {
    photos: photosSlice
  },
});
