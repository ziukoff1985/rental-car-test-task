import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchCarsThunk, fetchCarByIdThunk, bookCarThunk } from "./operations";

const initialState = {
  cars: [],
  currentCar: null,
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  filters: {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  },
  page: 1,
  totalPages: 0, // Додаємо для зберігання загальної кількості сторінок
  isLoading: false,
  isError: null,
};

const carsSlice = createSlice({
  name: "cars",
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
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    clearFilters: (state) => {
      state.filters = {
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
      };
      state.page = 1;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarsThunk.fulfilled, (state, action) => {
        if (state.page === 1) {
          state.cars = action.payload.cars; // Оновлюємо список авто
        } else {
          state.cars = [...state.cars, ...action.payload.cars]; // Додаємо нові авто для пагінації
        }
        state.totalPages = action.payload.totalPages; // Зберігаємо загальну кількість сторінок
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(fetchCarByIdThunk.fulfilled, (state, action) => {
        state.currentCar = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      // eslint-disable-next-line no-unused-vars
      .addCase(bookCarThunk.fulfilled, (state, _action) => {
        state.isLoading = false;
        state.isError = null;
      })
      .addMatcher(
        isAnyOf(
          fetchCarsThunk.pending,
          fetchCarByIdThunk.pending,
          bookCarThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCarsThunk.rejected,
          fetchCarByIdThunk.rejected,
          bookCarThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
        }
      );
  },
});

export const { toggleFavorite, setFilters, clearFilters, incrementPage } =
  carsSlice.actions;
export const carsReducer = carsSlice.reducer;
