import { createSelector } from "@reduxjs/toolkit";

export const selectCars = (state) => state.cars.cars;
export const selectCurrentCar = (state) => state.cars.currentCar;
export const selectFavorites = (state) => state.cars.favorites;
export const selectFilters = (state) => state.cars.filters;
export const selectPage = (state) => state.cars.page;
export const selectIsLoading = (state) => state.cars.isLoading;
export const selectIsError = (state) => state.cars.isError;

// Мемоізований селектор для перевірки, чи є ще авто для завантаження
export const selectHasMoreCars = createSelector([selectCars], (cars) => {
  return cars.length % 8 === 0 && cars.length > 0; // Якщо кількість авто кратна 8, можливо, є ще
});
