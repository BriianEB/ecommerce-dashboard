import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import NProgress from 'nprogress';


function CustomRoute(props) {
    useEffect(function () {
        return (function () {
            NProgress.start();
        });
    }, []);

    return (
        <Route {...props} />
    );
}

export default CustomRoute;