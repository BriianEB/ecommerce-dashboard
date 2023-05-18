import { configureStore } from "@reduxjs/toolkit";

import notificationSlice from "./notificationSlice";
import progressBarSlice from "./progressBarSlice";


const store = configureStore({
    reducer: {
        notification: notificationSlice.reducer,
        progressBar: progressBarSlice.reducer
    }
});

export default store;