import request from "@/utils/request";

export function fetchStaffIntroductions(staffName, offset, limit) {
  return request({
    url: '/staff/list/introduction',
    method: 'get',
    params: {
      'offset': offset,
      'limit': limit,
      'staffName': staffName
    }
  })
}

export function fetchStaffInfo(id) {
  return request({
    url: `/staff/info/${id}`,
    method: 'get'
  })
}


export function addProductCountOfStaff(staffId, productId, finishTime, productNum, batchId, amount) {
  let data = {
    'staffId': staffId,
    'productId': productId,
    'finishTime': finishTime,
    'productNum': productNum,
    'batchId': batchId,
    'amount': amount
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
