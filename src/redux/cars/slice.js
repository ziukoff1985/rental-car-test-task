import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchCarsThunk, fetchCarByIdThunk, bookCarThunk } from './operations';

const initialState = {
  cars: [],
  currentCar: null,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  filters: {
    brand: '',
    price: '',
    mileageFrom: '',
    mileageTo: '',
  },
  page: 1,
  isLoading: false,
  isError: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      const isFavorite = state.favorites.includes(carId);
      if (isFavorite) {
        state.favorites = state.favorites.filter((id) => id !== carId);
      } else {
        state.favorites.push(carId);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1; // Скидаємо сторінку при зміні фільтрів
    },
    clearFilters: (state) => {
      state.filters = { brand: '', price: '', mileageFrom: '', mileageTo: '' };
      state.page = 1;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обробка fetchCarsThunk
      .addCase(fetchCarsThunk.fulfilled, (state, action) => {
        if (state.page === 1) {
          state.cars = action.payload; // Якщо перша сторінка, замінюємо список
        } else {
          state.cars = [...state.cars, ...action.payload]; // Додаємо нові авто для пагінації
        }
        state.isLoading = false;
        state.isError = null;
      })
      // Обробка fetchCarByIdThunk
      .addCase(fetchCarByIdThunk.fulfilled, (state, action) => {
        state.currentCar = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      // Обробка bookCarThunk
      // eslint-disable-next-line no-unused-vars
      .addCase(bookCarThunk.fulfilled, (state, _action) => {
        state.isLoading = false;
        state.isError = null;
      })
      // Обробка pending для всіх операцій
      .addMatcher(
        isAnyOf(fetchCarsThunk.pending, fetchCarByIdThunk.pending, bookCarThunk.pending),
        (state) => {
          state.isLoading = true;
          state.isError = null;
        }
      )
      // Обробка rejected для всіх операцій
      .addMatcher(
        isAnyOf(fetchCarsThunk.rejected, fetchCarByIdThunk.rejected, bookCarThunk.rejected),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
        }
      );
  },
});

export const { toggleFavorite, setFilters, clearFilters, incrementPage } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;