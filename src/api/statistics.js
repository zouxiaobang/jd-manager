import request from "@/utils/request";

export function countInfo() {
  return request({
    url: '/statistics',
    method: 'get'
  })
}
