export const apiCall = (url, method, payload = null, header = {}) => {
    let headers = {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    };
    if (!header.file)
        header['Content-Type'] = "application/json";
    if (header.auth)
        headers.Authorization = localStorage.getItem('token');
    return fetch(`http://localhost:5000/${url}`, {
            method: method,
            body: payload ? (header.file ? payload : JSON.stringify(payload)) : null,
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