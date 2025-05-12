import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./cars/slice.js";
import { filtersReducer } from "./filters/slice.js";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
  },
});
