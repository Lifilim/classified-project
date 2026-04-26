import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
    theme: string;
    language: string;
};

const initialState: SettingsState = {
    theme: localStorage.getItem('theme') || 'light',
    language: localStorage.getItem('lang') || 'ru',
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    selectors: {
        selectTheme: (state) => state.theme,
        selectLanguage: (state) => state.language,
    },
    reducers: {
        toggleTheme: (state) => {
            if (state.theme === 'light') {
                state.theme = 'dark';
            } else {
                state.theme = 'light'
            }
            localStorage.setItem('theme', state.theme);
        },
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
            localStorage.setItem('theme', state.theme);
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
    }
});

export const { toggleTheme, setTheme, setLanguage } = settingsSlice.actions;
export const { selectTheme, selectLanguage } = settingsSlice.selectors;

export default settingsSlice.reducer;