import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import notificationSlice from './notificationSlice';
import settingsSlice from './settingsSlice';


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        notification: notificationSlice.reducer,
        settings: settingsSlice.reducer,        
    }
});

export default store;