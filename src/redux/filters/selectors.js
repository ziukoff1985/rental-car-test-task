import { createSelector } from "@reduxjs/toolkit";
import { selectCars, selectFavorites } from "../cars/selectors";

export const selectShowFavorites = (state) => state.filters.showFavorites;

// Мемоізований селектор для відфільтрованих автомобілів
export const selectVisibleCars = createSelector(
  [selectCars, selectFavorites, selectShowFavorites],
  (cars, favorites, showFavorites) => {
    if (!showFavorites) return cars;
    return cars.filter((car) => favorites.includes(car.id));
  }
);
