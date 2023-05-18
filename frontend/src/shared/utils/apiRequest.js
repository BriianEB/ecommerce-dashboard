import axios from 'axios';


const apiUrl = 'http://localhost:5000';

function apiRequest(method, endpoint, data, params) {
    const headers = {
        'Content-Type': 'application/json'
    };

    return new Promise(function (resolve, reject) {
        axios({
            url: apiUrl + endpoint,
            method: method,
            headers: headers,
            params: params,
            data: data
        }).then(function (response) {
            resolve(response.data);
        }, function (error) {
            console.log(error);
            reject(error.response.data);
        });
    });
}

export default apiRequest;

export const api = {
    get: (...args) => apiRequest('get', ...args),
    post: (...args) => apiRequest('post', ...args),
    put: (...args) => apiRequest('put', ...args),
    patch: (...args) => apiRequest('patch', ...args),
    delete: (...args) => apiRequest('delete', ...args)
};
