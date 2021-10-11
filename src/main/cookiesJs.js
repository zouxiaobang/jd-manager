import Cookies from 'js-cookie';

const TOKEN_KEY = 'TOKEN_KEY';

// getter
export function getToken() {
    return Cookies.get(TOKEN_KEY);
}

// setter
export function setToken(token) {
    return Cookies.set(TOKEN_KEY, token);
}

// remove
export function removeToken() {
    return Cookies.remove(TOKEN_KEY);
}