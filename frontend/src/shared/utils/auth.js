function getRefreshToken() {
    return localStorage.getItem('refresh_token');
}

function setSession(refresh_token) {
    localStorage.setItem('refresh_token', refresh_token);
}

function removeSession() {
    localStorage.removeItem('refresh_token');
}

function isTokenExpired(exp_time) {
    const exp_date = new Date(exp_time * 1000);

    return exp_date < Date.now();
}

export { getRefreshToken, setSession, removeSession, isTokenExpired };