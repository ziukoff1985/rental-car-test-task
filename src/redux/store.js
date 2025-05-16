import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { carsReducer } from './cars/slice.js';

const persistConfig = {
  key: 'cars-data', // Змінено: унікальний ключ для вашого проєкту
  version: 1, // Додано: для майбутньої міграції
  storage,
  whitelist: ['favorites', 'brands'], // Змінено: зберігаємо лише favorites
};

const persistedReducer = persistReducer(persistConfig, carsReducer);

export const store = configureStore({
  reducer: {
    cars: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Змінено: ігноруємо всі дії
      },
    }),
});

export const persistor = persistStore(store);
