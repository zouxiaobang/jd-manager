import request from "@/utils/request";
import staff from "@/mock/staff";

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

export function fetchStaffInfos(offset, limit, name, phone, workStatus, startTime, endTime) {
  return request({
    url: '/staff/list',
    method: 'get',
    params: {
      'offset': offset,
      'limit': limit,
      'name': name,
      'phone': phone,
      'workStatus': workStatus,
      'startTime': startTime,
      'endTime': endTime
    }
  })
}

export function deleteStaffById(staffId) {
  return request({
    url: `/staff/${staffId}`,
    method: 'delete'
  })
}

export function createStaff(staffForm) {
  let data = {
    'startWorkTime': staffForm.startWorkTime,
    'notPayAmount': staffForm.notPayAmount,
    'totalAmount': staffForm.allAmount,
    'userId': staffForm.id,
    'username': staffForm.username,
    'phone': staffForm.phone,
    'roleIds': staffForm.roleIds
  };
  return request({
    url: '/staff',
    method: 'post',
    data: data
  })
}

export function deleteMultiStaff(staffIds) {
  return request({
    url: '/staff',
    method: 'delete',
    data: staffIds
  })
}
