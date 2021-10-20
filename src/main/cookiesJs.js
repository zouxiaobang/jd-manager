import Cookies from 'js-cookie';

const TOKEN_KEY = 'TOKEN_KEY';
const REFRESH_KEY = 'REFRESH_KEY';

// getter
export function getToken() {
    return Cookies.get(TOKEN_KEY);
}
export function getRefreshToken() {
    return Cookies.get(REFRESH_KEY);
}

// setter
export function setToken(token) {
    return Cookies.set(TOKEN_KEY, token);
}
export function setRefreshToken(token) {
    return Cookies.set(REFRESH_KEY, token);
}

// remove
export function removeToken() {
    return Cookies.remove(TOKEN_KEY);
}
export function removeRefreshToken() {
    return Cookies.remove(REFRESH_KEY);
}
