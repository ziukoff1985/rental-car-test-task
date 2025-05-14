import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { carsReducer } from './cars/slice.js';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cars'],
};

const persistedReducer = persistReducer(persistConfig, carsReducer);

export const store = configureStore({
  reducer: {
    cars: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store); // Експортуємо persistor
