import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://car-rental-api.goit.global',
});

// Отримання списку брендів
// Повертає -> масив з брендами автомобілів
export const fetchBrandsThunk = createAsyncThunk(
  'cars/fetchBrands',
  async (_, thunkAPI) => {
    try {
      const response = await API.get('/brands');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Отримання списку автомобілів із пагінацією та фільтрами
// Повертає -> масив з об'єктами автомобілів + totalPages + page + totalCars
export const fetchCarsThunk = createAsyncThunk(
  'cars/fetchCars',
  async ({ page = 1, filters = {} }, thunkAPI) => {
    try {
      const response = await API.get('/cars', {
        params: {
          page,
          limit: 12,
          brand: filters.brand || undefined,
          rentalPrice: filters.rentalPrice || undefined,
          minMileage: filters.minMileage || undefined,
          maxMileage: filters.maxMileage || undefined,
        },
      });
      return {
        cars: response.data.cars || [],
        totalPages: response.data.totalPages || 0,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Отримання деталей автомобіля за ID
// Повертає -> об'єкт з деталями про конкретний автомобіль
export const fetchCarByIdThunk = createAsyncThunk(
  'cars/fetchCarById',
  async (id, thunkAPI) => {
    try {
      const response = await API.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
