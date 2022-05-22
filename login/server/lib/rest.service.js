import fetch from 'node-fetch';

export async function postMethod(url, body, headers) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'agent': 'RestClient',
            ...headers
        },
        body: JSON.stringify(body)
    });
}

export async function getMethod(url) {
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'agent': 'RestClient'
        }
    });
}

export async function putMethod(url, body) {
    return await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'agent': 'RestClient'
        },
        body: JSON.stringify(body)
    });
}

export async function deleteMethod(url) {
    return await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'agent': 'RestClient'
        },
    });
}