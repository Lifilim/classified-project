import { combineReducers } from "@reduxjs/toolkit";

import userSlice from './UserSlice';
import settingsSlice from './SettingsSlice';



export const rootReducer = combineReducers({
    slice1: userSlice,
    slice2: settingsSlice,
})
