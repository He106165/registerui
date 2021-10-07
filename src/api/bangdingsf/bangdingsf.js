import request from '@/utils/request'
const api = {
  bangdingsf: '/otherlogin/bindingsf',
  bangdingWechat: '/otherlogin/wxlogin'
}
// 查询参数列表
export function delAlipayInfo(query) {
  return request({
    url: api.bangdingsf + '/delAlipayInfo',
    method: 'post',
    params:query
  })
}
export function getUrlKey(name){
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
export function getUserInfo(query) {
  return request({
    url: api.bangdingsf + '/getUserInfo',
    method: 'post',
  })
}
//绑定微信
export function bangdingWechat() {
  return request({
    url: api.bangdingWechat + '/bangdingWechat',
    method: 'post',
  })
}
//解绑微信
export function delWeChatInfo(query) {
  return request({
    url: api.bangdingsf + '/delWeChatInfo',
    method: 'post',
    params:query
  })
}

