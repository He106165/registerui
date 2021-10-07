import request from '@/utils/request'
const api = {
  personnalMethod: '/otherlogin/wxlogin',
  otherMethod: '/otherlogin/otherApi'
}
// 查询参数列表
export function completeInfo(query) {
  return request({
    url: api.personnalMethod + '/completeInfo',
    method: 'post',
    params: query
  })
}
// 查询参数列表
export function WechatSendMsg(data) {
  return request({
    url: api.personnalMethod + '/WechatSendMsg?phone='+data,
    method: 'get'
  })
}
