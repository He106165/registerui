import request from '@/utils/request'

const api = {
  personnalMethod: '/userRegister'
}
export default class personalUserInfoApi {
  // 新建用户
  static addSave(data) {
    return request({
      url: api.personnalMethod + '/userRegister/userInfo',
      method: 'post',
      data
    })
  }

  // 获取国家/地区
  static queryNationality() {
    return request({
      url: api.personnalMethod + '/userRegister/queryNationality',
      method: 'post'
    })
  }

  //获取身份类型
  static queryCardType() {
    return request({
      url: api.personnalMethod + '/userRegister/queryCardType',
      method: 'post'
    })
  }

  //校验手机号唯一
  static countByPhone(data) {
    return request({
      url: api.personnalMethod + '/userRegister/countByPhone',
      method: 'post',
      data
    })
  }

  //校验身份证号唯一
  static countByCardNo(data) {
    return request({
      url: api.personnalMethod + '/userRegister/countByCardNo',
      method: 'post',
      data
    })
  }

  //手机号注册，查询填写邮箱是否绑定
  static countByPhoneEmail(data) {
    return request({
      url: api.personnalMethod + '/userRegister/countByPhoneEmail',
      method: 'post',
      data
    })
  }

  //邮箱注册，查询手机号是否被绑定
  static countByEmailPhone(data) {
    return request({
      url: api.personnalMethod + '/userRegister/countByEmailPhone',
      method: 'post',
      data
    })
  }

  // 判断个人昵称是否存在
  static countBySomeThing(data) {
    return request({
      url: api.personnalMethod + '/userRegister/countBySomeThing',
      method: 'post',
      data
    })
  }

  //获取校验邮箱唯一
  static countByEmail(data) {
    return request({
      url: api.personnalMethod + '/userRegister/countByEmail',
      method: 'post',
      data
    })
  }

  //获取发送验证码
  static sendMsg(data) {
    return request({
      url: api.personnalMethod + '/userRegister/sendMsg',
      method: 'post',
      data
    })
  }

  //验证手机验证码
  static checkValidatePhoneCode(data) {
    return request({
      url: api.personnalMethod + '/userRegister/checkValidatePhoneCode',
      method: 'post',
      data
    })
  }

  //验证邮箱验证码
  static checkValidateEmailCode(data) {
    return request({
      url: api.personnalMethod + '/userRegister/checkValidateEmailCode',
      method: 'post',
      data
    })
  }

//获取生僻字的路径
  static querySpz(data) {
    return request({
      url: api.personnalMethod + '/spz/querySpz',
      method: 'post',
      data
    })
  }

}
