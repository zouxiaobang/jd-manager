import request from "@/utils/request";

export function fetchProductInfos() {
    return request({
        url: '/product/list',
        method: 'get'
    })
}


