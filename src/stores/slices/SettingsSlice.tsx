import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type SettingsState = {
    isDarkTheme: boolean;
    language: string;
};

const initialState: SettingsState = {
    isDarkTheme: false,
    language: "en"
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkTheme = !state.isDarkTheme;
        },
        setDarkTheme: (state, action: PayloadAction<boolean>) => {
            state.isDarkTheme = action.payload;
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        }
    }
});

export const { toggleTheme, setDarkTheme, setLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;

export const selectIsDarkTheme = (state: RootState) => state.settings.isDarkTheme;
export const selectLanguage = (state: RootState) => state.settings.language;