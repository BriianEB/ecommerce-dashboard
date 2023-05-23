import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useAuth from 'shared/hooks/useAuth';
import LoadingScreen from './LoadingScreen';
import { isTokenExpired, getRefreshToken } from 'shared/utils/auth';
import { refreshAccessToken } from 'store/authSlice';


function AuthGuard({ children }) {    
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, expiration } = useAuth();
    const path = location.pathname;
    const [refreshing, setRefreshing] = useState(false);

    useEffect(function () {
        if (!isAuthenticated) {            
            const refreshToken = getRefreshToken();

            if (refreshToken === null) {
                navigate('/auth/login');

                return;                
            }

            dispatch(refreshAccessToken());

            return;
        }
        
        // Cada que se cambia de ruta en la app, revisa que el access token
        // sea válido.
        if (isTokenExpired(expiration)) {
            setRefreshing(true);
            dispatch(refreshAccessToken());
        } else {
            setRefreshing(false);
        }

    }, [path, expiration, isAuthenticated, navigate, dispatch]);

    if (!isAuthenticated) {
        // Si el flujo llega a este punto, significa que la página fue recargada
        // (por consiguiente, que no existe una sesión); pero hay un refresh
        // token válido guardado y se está solicitando un nuevo access token
        // al backend.
        return (
            <LoadingScreen />
        );
    }

    if (refreshing) {
        return <LoadingScreen />;
    }

    return (
        <>
            {children}
        </>
    );
}

export default AuthGuard;