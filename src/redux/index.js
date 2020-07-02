export const apiCall = (url, method, payload = null, auth = null) => {
    let headers = {
        'Content-Type': 'application/json'
    };
    if (auth)
        headers.Authorization = localStorage.getItem('token');
    return fetch(`http://localhost:5000/${url}`, {
            method: method,
            body: payload ? JSON.stringify(payload) : null,
            headers
        })
        .then(response => {
            if (response.status === 401)
                return { auth: false, msg: "El token ha expirado", error: true }
            return response.json();
        })
        .catch(error => ({ error }))
        .then(response => ({ response }));
}