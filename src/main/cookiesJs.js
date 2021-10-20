import Cookies from 'js-cookie';


const TOKEN_KEY = 'TOKEN_KEY';
export function getToken() {
    return Cookies.get(TOKEN_KEY);
}
export function setToken(token) {
  return Cookies.set(TOKEN_KEY, token);
}
export function removeToken() {
  return Cookies.remove(TOKEN_KEY);
}


const REFRESH_KEY = 'REFRESH_KEY';
export function getRefreshToken() {
    return Cookies.get(REFRESH_KEY);
}
export function setRefreshToken(token) {
    return Cookies.set(REFRESH_KEY, token);
}
export function removeRefreshToken() {
    return Cookies.remove(REFRESH_KEY);
}


const IS_SIGN_OUT = 'IS_SIGN_OUT'
export function isSignOut() {
  return Cookies.get(IS_SIGN_OUT);
}
export function setSignOut(flag) {
  return Cookies.set(IS_SIGN_OUT, flag);
}
export function removeSignOut() {
  return Cookies.remove(IS_SIGN_OUT);
}
