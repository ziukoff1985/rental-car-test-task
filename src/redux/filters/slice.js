import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showFavorites: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleShowFavorites: (state) => {
      state.showFavorites = !state.showFavorites;
    },
  },
});

export const { toggleShowFavorites } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;