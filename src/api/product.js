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
