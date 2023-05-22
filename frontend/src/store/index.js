import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import notificationSlice from './notificationSlice';
import settingsSlice from './settingsSlice';

import { setAccessToken } from 'shared/utils/apiRequest';


/**
 * Función de middleware para interceptar el access token de la acción
 * de login y poder pasarlo al objeto "api" que se usa para hacer las peticiones
 * al backend.
 * Se hace de esta manera ya que el objeto "api" no tiene forma de acceder a la
 * store (ya que no es ni un componente ni un hook).
 */
const retrieveAccessToken = store => next => action => {
    if (action.type === 'auth/login') {
        setAccessToken(action.payload.token);
    }

    return next(action);
};

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        notification: notificationSlice.reducer,
        settings: settingsSlice.reducer,        
    },
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware().concat(retrieveAccessToken);
    }
});

export default store;