import { createSlice } from '@reduxjs/toolkit';

import { getRefreshToken, setSession } from 'shared/utils/auth';
import { api } from 'shared/utils/apiRequest';


const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    expiration: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: function (state, action) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.expiration = action.payload.expiration;
        },

        logout: function () {
            return initialState;
        }
    }
});

// Thunks
function refreshAccessToken() {
    return async function (dispatch) {
        const refreshToken = getRefreshToken();
        
        const response = await api.post('/auth/refresh', {
            refresh_token: refreshToken
        });

        const {
            access_token,
            access_token_exp_time,
            refresh_token,
            user
        } = response;

        dispatch(authSlice.actions.login({
            user: user,
            token: access_token,
            expiration: access_token_exp_time

        }));        

        setSession(refresh_token);

        console.log('session refreshed');
    }
}

export const { login, logout } = authSlice.actions;

export { refreshAccessToken };

export default authSlice;