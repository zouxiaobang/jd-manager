import request from "@/utils/request";

export function fetchStaffIntroductions() {
    return request({
        url: '/staff/list/introduction',
        method: 'get'
    })
}