import { configureStore } from "@reduxjs/toolkit";

import notificationSlice from "./notificationSlice";
import settingsSlice from "./settingsSlice";


const store = configureStore({
    reducer: {
        notification: notificationSlice.reducer,
        settings: settingsSlice.reducer
    }
});

export default store;