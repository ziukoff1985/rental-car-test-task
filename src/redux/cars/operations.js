import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

// Отримання списку брендів
export const fetchBrandsThunk = createAsyncThunk(
  "cars/fetchBrands",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/brands");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Отримання списку автомобілів із пагінацією та фільтрами
export const fetchCarsThunk = createAsyncThunk(
  "cars/fetchCars",
  async ({ page = 1, filters = {} }, thunkAPI) => {
    try {
      const response = await API.get("/cars", {
        params: {
          page,
          limit: 12,
          brand: filters.brand || undefined,
          rentalPrice: filters.rentalPrice || undefined,
          minMileage: filters.minMileage || undefined,
          maxMileage: filters.maxMileage || undefined,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Отримання деталей автомобіля за ID
export const fetchCarByIdThunk = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkAPI) => {
    try {
      const response = await API.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
