import request from "@/utils/request";

export function fetchStaffIntroductions() {
    return request({
        url: '/staff/list/introduction',
        method: 'get'
    })
}

export function fetchStaffInfo(id) {
    return request({
        url: `/staff/info/${id}`,
        method: 'get'
    })
}
