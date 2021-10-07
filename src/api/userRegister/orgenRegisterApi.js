import request from '@/utils/request'

const api = {
  personnalMethod: '/userRegister'
}
export default class orgenRegisterApi {

//查询法人类型
  static queryPerManType() {
    return request({
      url: api.personnalMethod + '/orgenRegister/queryPerManType',
      method: 'post',
    })
  }

  //查询法人性质
  static queryperManLine() {
    return request({
      url: api.personnalMethod + '/orgenRegister/queryperManLine',
      method: 'post',
    })
  }

  // 查询部门类型
  static queryDepermentCode() {
    return request({
      url: api.personnalMethod + '/orgenRegister/queryDepermentCode',
      method: 'post',
    })
  }

// 查询使领馆教育处
  static queryConsulateInfo() {
    return request({
      url: api.personnalMethod + '/orgenRegister/queryConsulateInfo',
      method: 'post',
    })
  }

  // 查询部门类型+统一社会信用码是否唯一
  static valiIdType(data) {
    return request({
      url: api.personnalMethod + '/orgenRegister/valiIdType',
      method: 'post',
      data
    })
  }

  // 保存方法
  static submit(data) {
    return request({
      url: api.personnalMethod + '/orgenRegister/orgenInfo',
      method: 'post',
      data
    })
  }

  // 机构注册短信发送
  static ogenSend(data) {
    return request({
      url: api.personnalMethod + '/orgenRegister/ogenSend',
      method: 'post',
      data
    })
  }
  // 验证国内企业注册的验证码（国内企业）
  static checkValidateCodeOrg1(data) {
    return request({
      url: api.personnalMethod + '/orgenRegister/checkValidateCodeOrg1',
      method: 'post',
      data
    })
  }
  // 验证国内企业注册的验证码（海外机构）
  static checkValidateCodeOrg2(data) {
    return request({
      url: api.personnalMethod + '/orgenRegister/checkValidateCodeOrg2',
      method: 'post',
      data
    })
  }
  // 验证国内企业注册的验证码（海外学联）
  static checkValidateCodeOrg3(data) {
    return request({
      url: api.personnalMethod + '/orgenRegister/checkValidateCodeOrg3',
      method: 'post',
      data
    })
  }
  // 机构注册 注册用户 校验邮箱是否已经绑定
  static orgenEmailCount(data) {
    return request({
      url: api.personnalMethod + '/orgenRegister/orgenEmailCount',
      method: 'post',
      data
    })
  }

  // 机构注册 找回密码 校验邮箱是否已经注册
  static orgenEmailPassCount(data) {
    return request({
      url: api.personnalMethod + '/orgenRegister/orgenEmailPassCount',
      method: 'post',
      data
    })
  }
  // 机构注册 找回密码 发送邮箱验证码
  static ogenForgetSend(data) {
    return request({
      url: api.personnalMethod + '/orgenRegister/ogenForgetSend',
      method: 'post',
      data
    })
  }
  // 机构注册 找回密码 验证 验证码是否通过校验
  static orgenForgetValidateEmailCode(data) {
    return request({
      url: api.personnalMethod + '/orgenRegister/orgenForgetValidateEmailCode',
      method: 'post',
      data
    })
  }
  // 机构注册 找回密码 修改密码
  static updateOrgenEmailPassword(data) {
    return request({
      url: api.personnalMethod + '/orgenRegister/updateOrgenEmailPassword',
      method: 'post',
      data
    })
  }
}
