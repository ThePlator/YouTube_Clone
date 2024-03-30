import { createSlice } from '@reduxjs/toolkit';

export const videoTagSlice = createSlice({
  name: 'videoTag',
  initialState: {
    tagName: '',
  },
  reducers: {
    setVideoTag: (state, action) => {
      state.tagName = action.payload;
    },
  },
});

export const { setVideoTag } = videoTagSlice.actions;

export default videoTagSlice.reducer;
