import request from "@/utils/request";

export function login(username, password) {
    const data = {
        'username': username,
        'password': password
    };

    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}

export function getUserInfo() {
    return request({
        url: 'user/info',
        method: 'get'
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'get'
    })
}