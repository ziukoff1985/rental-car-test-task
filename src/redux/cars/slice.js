import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchCarsThunk,
  fetchCarByIdThunk,
  fetchBrandsThunk,
} from './operations';

const initialState = {
  cars: [],
  currentCar: null,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  brands: [],
  filters: {
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  },
  page: 1,
  totalPages: 0,
  showFavorites: false,
  isLoading: false,
  isError: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addOrRemoveFromFavorites: (state, action) => {
      const carId = action.payload;
      const isFavorite = state.favorites.includes(carId);
      if (isFavorite) {
        state.favorites = state.favorites.filter(id => id !== carId);
      } else {
        state.favorites.push(carId);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    clearFilters: state => {
      state.filters = {
        brand: '',
        rentalPrice: '',
        minMileage: '',
        maxMileage: '',
      };
      state.page = 1;
    },
    incrementPage: state => {
      state.page += 1;
    },

    resetCars: state => {
      state.cars = [];
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    setShowFavoritesMode: state => {
      state.showFavorites = !state.showFavorites;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCarsThunk.fulfilled, (state, action) => {
        if (state.page === 1) {
          state.cars = action.payload.cars;
        } else {
          state.cars = [...state.cars, ...action.payload.cars];
        }
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(fetchCarByIdThunk.fulfilled, (state, action) => {
        state.currentCar = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(fetchBrandsThunk.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addMatcher(
        isAnyOf(
          fetchCarsThunk.pending,
          fetchCarByIdThunk.pending,
          fetchBrandsThunk.pending
        ),
        state => {
          state.isLoading = true;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCarsThunk.rejected,
          fetchCarByIdThunk.rejected,
          fetchBrandsThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
        }
      );
  },
});

export const {
  addOrRemoveFromFavorites,
  setFilters,
  clearFilters,
  incrementPage,
  setPage,
  setShowFavoritesMode,
} = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
