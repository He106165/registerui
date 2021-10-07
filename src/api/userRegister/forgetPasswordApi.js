import request from '@/utils/request'

const api = {
  personnalMethod: '/userRegister'
}
export default class forgetPasswordApi {
  //获取发送验证码
  static findPasswordMsg(data) {
    return request({
      url: api.personnalMethod+'/forgetPassword/findPasswordMsg',
      method: 'post',
      data
    })
  }
  // 修改密码
  static updatePassword(data) {
    return request({
      url: api.personnalMethod+'/forgetPassword/updatePassword',
      method: 'post',
      data
    })
  }
  // 人工找回密码 向提交表里边插入
  static saveArtificialInfo(data) {
    return request({
      url: api.personnalMethod+'/forgetPassword/saveArtificialInfo',
      method: 'post',
      data
    })
  }
// 查询该手机号是否已经注册
  static phonePasswordCount(data) {
    return request({
      url: api.personnalMethod+'/forgetPassword/phonePasswordCount',
      method: 'post',
      data
    })
  }

  // 查询该邮箱是否已经注册
  static emailPasswordCount(data) {
    return request({
      url: api.personnalMethod+'/forgetPassword/emailPasswordCount',
      method: 'post',
      data
    })
  }
  //获取发送验证码
  static findPasswordMsg(data) {
    return request({
      url: api.personnalMethod+'/forgetPassword/findPasswordMsg',
      method: 'post',
      data
    })
  }
  //通过人工方式，获取发送验证码
  static artificialFindPasswordMsg(data) {
    return request({
      url: api.personnalMethod+'/forgetPassword/artificialFindPasswordMsg',
      method: 'post',
      data
    })
  }

  //获取发送手机验证码 用于找回密码
  static validatePhonePasswordCode(data) {
    return request({
      url: api.personnalMethod+'/forgetPassword/validatePhonePasswordCode',
      method: 'post',
      data
    })
  }

  //获取发送邮箱验证码 用于找回密码
  static validateEmailPasswordCode(data) {
    return request({
      url: api.personnalMethod+'/forgetPassword/validateEmailPasswordCode',
      method: 'post',
      data
    })
  }

  static validateEmailPasswordCode(data) {
    return request({
      url: api.personnalMethod+'/forgetPassword/validateEmailPasswordCode',
      method: 'post',
      data
    })
  }

}
