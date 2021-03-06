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


export function addProductCountOfStaff(staffId, productId, finishTime, productNum) {
    let data = {
        'staffId': staffId,
        'productId': productId,
        'finishTime': finishTime,
        'productNum': productNum
    }
    return request({
        url: '/staff/product/work',
        method: 'post',
        data: data
    })
}

export function fetchStaffInfos(name, phone, workStatus, startTime, endTime) {
    return request({
        url: '/staff/list',
        method: 'get',
        params: {
            'name': name,
            'phone': phone,
            'workStatus': workStatus,
            'startTime': startTime,
            'endTime': endTime
        }
    })
}