import request from "@/utils/request";
import staff from "@/mock/staff";
import es from "element-ui/src/locale/lang/es";

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

export function settleSingle(staffId) {
  return request({
    url: `/settle/single/${staffId}`,
    method: 'put'
  })
}

export function settleMulti(staffIds) {
  return request({
    url: '/settle/multi',
    method: 'put',
    data: staffIds
  })
}

export function settleBatch(staffId, amount) {
  return request({
    url: `/settle/batch/${staffId}`,
    method: 'put',
    params: {
      'amount': amount
    }
  })
}

export function getSettleRecordByStaff(staffId, offset, limit) {
  return request({
    url: `/settle/record/${staffId}`,
    method: 'get',
    params: {
      'offset': offset,
      'limit': limit
    }
  })
}

export function getWorkNotesByStaffId(staffId, offset, limit) {
  return request({
    url: `/staff/list/worknote/${staffId}`,
    method: 'get',
    params: {
      'offset': offset,
      'limit': limit
    }
  })
}
