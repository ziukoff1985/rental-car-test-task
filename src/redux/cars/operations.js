import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

// Отримання списку автомобілів із пагінацією та фільтрами
export const fetchCarsThunk = createAsyncThunk(
  "cars/fetchCars",
  async ({ page = 1, filters = {} }, thunkAPI) => {
    try {
      const response = await API.get("/cars", {
        params: {
          page,
          limit: 8,
          ...filters,
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

// Бронювання автомобіля
export const bookCarThunk = createAsyncThunk(
  "cars/bookCar",
  async ({ carId, bookingData }, thunkAPI) => {
    try {
      const response = await API.post(`/bookings`, { carId, ...bookingData });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
