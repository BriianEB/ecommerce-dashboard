import { createSlice } from '@reduxjs/toolkit';


const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        themeMode: 'light'
    },
    reducers: {
        toggleThemeMode: function (state) {
            state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
        }
    }
});

export const { toggleThemeMode } = settingsSlice.actions;

export default settingsSlice;
