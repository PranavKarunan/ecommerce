
import dataService from 'axios.js'

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url) {

    return dataService.get(url).then(handleResponse);
}

function post(url, body) {
    return dataService.post(url, body).then(handleResponse);
}

function put(url, body) {
    return dataService.put(url, body).then(handleResponse);
}


function _delete(url, body) {

    return dataService.delete(url, { body }).then(handleResponse);
}

// helper functions

function handleResponse(response) {

    if (response === undefined) {
        return null;
    }
    if (response.data.data === undefined) {
        ;
        return response.data;
    }
    else

        return response.data.data;

}