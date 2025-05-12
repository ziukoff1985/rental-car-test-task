import { createSelector } from "@reduxjs/toolkit";

export const selectCars = (state) => state.cars.cars;
export const selectCurrentCar = (state) => state.cars.currentCar;
export const selectFavorites = (state) => state.cars.favorites;
export const selectBrands = (state) => state.cars.brands;
export const selectFilters = (state) => state.cars.filters;
export const selectPage = (state) => state.cars.page;
export const selectTotalPages = (state) => state.cars.totalPages;
export const selectShowFavorites = (state) => state.cars.showFavorites;
export const selectIsLoading = (state) => state.cars.isLoading;
export const selectIsError = (state) => state.cars.isError;

// Мемоізований селектор для перевірки, чи є ще авто для завантаження
export const selectHasMoreCars = createSelector(
  [selectPage, selectTotalPages],
  (page, totalPages) => {
    return page < totalPages;
  }
);

// Мемоізований селектор для відфільтрованих автомобілів
export const selectVisibleCars = createSelector(
  [selectCars, selectFavorites, selectShowFavorites],
  (cars, favorites, showFavorites) => {
    if (!showFavorites) return cars;
    return cars.filter((car) => favorites.includes(car.id));
  }
);
