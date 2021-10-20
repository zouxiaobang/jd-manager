import request from "@/utils/request";

export function login(username, password) {
    const data = {
        'username': username,
        'password': password
    };

    return request({
        url: '/sign/login',
        method: 'post',
        data: data
    })
}

export function getUserInfo() {
    return request({
        url: '/user/info',
        method: 'get'
    })
}

export function logout() {
    return request({
        url: '/sign/logout',
        method: 'get'
    })
}
