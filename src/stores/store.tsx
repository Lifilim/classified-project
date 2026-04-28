// import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import settingsReducer from './slices/SettingsSlice';
import servicesReducer from './slices/ServicesSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        settings: settingsReducer,
        services: servicesReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 