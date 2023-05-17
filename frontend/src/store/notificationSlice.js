import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    open: false,
    type: 'success',
    message: ''
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        notifySuccess: function (state, action) {
            state.open = true;
            state.type = 'success';
            state.message = action.payload;
        },

        notifiyError: function (state, action) {
            state.open = true;
            state.type = 'error';
            state.message = action.payload;
        },

        close: function () {
            return initialState;
        }
    }
});

export const { notifySuccess, notifiyError, close } = notificationSlice.actions;

export default notificationSlice;