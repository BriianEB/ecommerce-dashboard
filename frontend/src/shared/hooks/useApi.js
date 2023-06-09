import { useCallback, useReducer } from 'react';
import { useSelector } from 'react-redux';

import useDeepMemo from './useDeepMemo';
import apiRequest from 'shared/utils/apiRequest';


function apiReducer(state, action) {
    if (action.type === 'SEND') {
        return {
            status: 'pending',
            data: null,
            error: null
        };
    }

    if (action.type === 'SUCCESS') {
        return {
            status: 'completed',
            data: action.data,
            error: null
        };
    }

    if (action.type === 'ERROR') {
        return {
            status: 'error',
            data: null,
            error: action.error
        };
    }

    return state;
}

function useApi(method, endpoint, instanceParams) {
    const { token } = useSelector((state) => state.auth);
    const memoParams = useDeepMemo(instanceParams);

    const [state, dispatch] = useReducer(apiReducer, {
        status: null,
        data: null,
        error: null
    });

    // params: se habilita la opción de pasar los parámetros de la
    // petición tanto al momento de "instanciar" como al de llamar la función
    // porque existen dos escenarios: 1) para una petición get, lo ideal es
    // pasarlos al "instanciar" la función de petición; 2) para las peticiiones
    // post, patch y put, lo ideal es pasarlos al momento de llamar la función
    const request = useCallback(function (data, callTimeParams) {
        dispatch({ type: 'SEND' });

        const params = callTimeParams ? callTimeParams : memoParams;
        const headers = token ? {Authorization: `Bearer ${token}`} : {};

        apiRequest(method, endpoint, data, params, headers).then(function (response) {
            dispatch({
                 type: 'SUCCESS',
                 data: response
             });
        }, function (error) {
            if (error.code === 401) {
                console.log('unauth');
            }

            dispatch({
                type: 'ERROR',
                error: error
            });
        });
    }, [method, endpoint, memoParams, token]);

    return [
        request,
        state.status,
        state.data,
        state.error
    ];
}

/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line
export default {
    get: (...args) => useApi('get', ...args),
    post: (...args) => useApi('post', ...args),
    put: (...args) => useApi('put', ...args),
    patch: (...args) => useApi('patch', ...args),
    delete: (...args) => useApi('delete', ...args)
}
