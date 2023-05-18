import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { startProgress } from 'store/progressBarSlice';


function CustomRoute({ children }) {
    const dispatch = useDispatch();

    useEffect(function () {
        return (function () {
            dispatch(startProgress());
        });
    }, [dispatch]);

    return (
        children
    );
}

export default CustomRoute;