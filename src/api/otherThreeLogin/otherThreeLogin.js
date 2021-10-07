import request from '@/utils/request'
const api = {
  personnalMethod: '/otherlogin/info',
  otherMethod: '/otherlogin/otherApi'
}
// 查询参数列表
export function insertAlipayUser(query) {
  return request({
    url: api.personnalMethod + '/insertAlipayUser',
    method: 'post',
    params: query
  })
}



export function  queryNationality() {
  return request({
    url: api.otherMethod + '/queryNationality',
    method: 'post',
  })
}
export function  queryCardType() {
  return request({
    url: api.otherMethod + '/queryCardType',
    method: 'post',
  })
}

//获取校验邮箱唯一
export function countByEmail(data) {
  return request({
    url: api.otherMethod+'/countByEmail',
    method: 'post',
    data
  })
}

//校验手机号唯一
export function countByPhone(data) {
  return request({
    url: api.otherMethod+'/countByPhone',
    method: 'post',
    data
  })
}

//校验身份证号唯一
export function countByCardNo(data) {
  return request({
    url: api.otherMethod+'/countByCardNo',
    method: 'post',
    data
  })
}
//支付宝完善信息发送验证码
export function AliPayBindUserSendMsg(data){
  return request({
    url: api.personnalMethod+'/AliPayBindUserSendMsg?phone='+data,
    method: 'get',
  })
}
