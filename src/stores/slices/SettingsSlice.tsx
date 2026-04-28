import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type SettingsState = {
    theme: string;
    language: string;
};

const initialState: SettingsState = {
    theme: 'light',
    language: "en"
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            if (state.theme === 'light') {
                state.theme = 'dark';
            } else {
                state.theme = 'light'
            }
        },
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        }
    }
});

export const { toggleTheme, setTheme, setLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;

export const selectTheme = (state: RootState) => state.settings.theme;
export const selectLanguage = (state: RootState) => state.settings.language;