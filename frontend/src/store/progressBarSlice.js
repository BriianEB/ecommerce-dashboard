import { createSlice } from '@reduxjs/toolkit';


const progressBarSlice = createSlice({
    name: 'progressBar',
    initialState: {
        progress: false
    },
    reducers: {
        startProgress: function (state) {            
            state.progress = true;
        },

        finishProgress: function (state) {
            state.progress = false;
        }
    }
});

export const { startProgress, finishProgress } = progressBarSlice.actions;

export default progressBarSlice;