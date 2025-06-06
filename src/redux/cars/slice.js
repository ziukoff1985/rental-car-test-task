import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchCarsThunk,
  fetchCarByIdThunk,
  fetchBrandsThunk,
} from './operations';

const initialState = {
  cars: [],
  currentCar: null,
  favorites: [],
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
      const car = action.payload;
      const isFavorite = state.favorites.some(item => item.id === car.id);
      if (isFavorite) {
        state.favorites = state.favorites.filter(item => item.id !== car.id);
      } else {
        state.favorites.push(car);
      }
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
      state.cars = [];
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

    clearFavorites: state => {
      state.favorites = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCarsThunk.fulfilled, (state, action) => {
        const newCars = action.payload.cars || [];
        if (state.page === 1) {
          state.cars = newCars;
        } else {
          state.cars = [...state.cars, ...newCars];
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
  resetCars,
  setShowFavoritesMode,
  clearFavorites,
} = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
