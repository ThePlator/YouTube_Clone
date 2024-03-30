import { createSlice } from '@reduxjs/toolkit';

const sidenavSlice = createSlice({
  name: 'Side_Nav',
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
  },
});

export const { toggleMenu, closeMenu, openMenu } = sidenavSlice.actions;
export default sidenavSlice.reducer;
