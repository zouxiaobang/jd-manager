import request from "@/utils/request";

export function fetchProductInfos() {
    return request({
        url: '/product/list',
        method: 'get'
    })
}

export function fetchProductBatch(productId) {
  return request({
    url: `/product/batch/${productId}`,
    method: 'get'
  })
}

export function checkBatchStatus(batchId, finishNum) {
  return request({
    url: '/product/check/batch/status',
    method: 'get',
    params: {
      'batchId': batchId,
      'finishNum': finishNum
    }
  })
}
