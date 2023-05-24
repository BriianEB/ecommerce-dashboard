import { useEffect } from 'react';
import { useRouteError, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useAuth from 'shared/hooks/useAuth';
import { refreshAccessToken } from 'store/authSlice';


function Error() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const error = useRouteError();
    const { isAuthenticated } = useAuth();
    //console.log(error);
    //console.log(location);

    useEffect(function () {
        if (isAuthenticated) {
            navigate(location.pathname);
        }
    }, [isAuthenticated]);

    if (error.code === 401) {
        dispatch(refreshAccessToken());
    }

    return (
        'error'
    );
}

export default Error;