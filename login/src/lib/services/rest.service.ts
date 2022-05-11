export async function postMethod<T>(url: string, body: T) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'agent': 'RestClient',
        },
        body: JSON.stringify(body)
    });
}

export async function getMethod(url: string) {
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'agent': 'RestClient'
        }
    });
}

export async function putMethod<T>(url: string, body: T) {
    return await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'agent': 'RestClient'
        },
        body: JSON.stringify(body)
    });
}

export async function deleteMethod(url: string) {
    return await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'agent': 'RestClient'
        },
    });
}