import { configureStore } from '@reduxjs/toolkit';
import sidenavSlice from './sidenavSlice';
import videoTagSlice from './videoTagSlice';
import searchSlice from './searchSlice';

const store = configureStore({
  reducer: {
    app: sidenavSlice,
    videoTag: videoTagSlice,
    search: searchSlice,
  },
});

export default store;
