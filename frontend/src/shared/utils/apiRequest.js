import axios from 'axios';


const apiUrl = 'http://localhost:5000';
let accessToken = null;

function setAccessToken(token) {
    accessToken = token;
}

function apiRequest(method, endpoint, data, params) {
    const headers = {
        'Content-Type': 'application/json'
    };

    if (accessToken !== null) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    return new Promise(function (resolve, reject) {
        axios({
            url: apiUrl + endpoint,
            method: method,
            headers: headers,
            params: params,
            data: data
        }).then(function (response) {
            resolve(response.data);
        }, function ( error) {
            if (error.response.status === 401) {
                console.log('sdfsdfsdf');
            }
            console.log('errorrerer', error);
            reject(error.response.data);
        });
    });
}

export const api = {
    get: (...args) => apiRequest('get', ...args),
    post: (...args) => apiRequest('post', ...args),
    put: (...args) => apiRequest('put', ...args),
    patch: (...args) => apiRequest('patch', ...args),
    delete: (...args) => apiRequest('delete', ...args)
};

export { setAccessToken };

export default apiRequest;