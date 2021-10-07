import request from '@/utils/request'

const api = {
  personnalMethod: '/userRegister'
}
export default class informationApi {
  //回显基本信息
  static queryInfo(data) {
    return request({
      url: api.personnalMethod+'/informationMain/queryInfo',
      method: 'post',
      data
    })
  }

  //修改基本信息
  static updateInfo(data) {
    return request({
      url: api.personnalMethod+'/informationMain/updateInfo',
      method: 'post',
      data
    })
  }

  //查询扩展信息
  static queryExtendInfo(data) {
    return request({
      url: api.personnalMethod+'/informationMain/queryExtendInfo',
      method: 'post',
      data
    })
  }
  //查询用户是否填写了扩展信息
  static queryExtendCount(data) {
    return request({
      url: api.personnalMethod+'/informationMain/queryExtendCount',
      method: 'post',
      data
    })
  }
  //新增、修改扩展信息
  static saveOrUpdate(data) {
    return request({
      url: api.personnalMethod+'/informationMain/saveOrUpdate',
      method: 'post',
      data
    })
  }

  //新增留学经历
  static insertAbroafdstudyInfo(data) {
    return request({
      url: api.personnalMethod+'/informationMain/insertAbroafdstudyInfo',
      method: 'post',
      data
    })
  }
  //查询留学经历
  static queryAbroafdstudyInfo(data) {
    return request({
      url: api.personnalMethod+'/informationMain/queryAbroafdstudyInfo',
      method: 'post',
      data
    })
  }

  //查询留学经历
  static queryAbroafdstudyInfoById(data) {
    return request({
      url: api.personnalMethod+'/informationMain/queryAbroafdstudyInfoById',
      method: 'post',
      data
    })
  }

  //查询实名信息
  static queryRealNameInformation(data) {
    return request({
      url: api.personnalMethod+'/informationMain/queryRealNameInformation',
      method: 'post',
      data
    })
  }
  //修改留学经历
  static updateAbroafdstudyInfo(data) {
    return request({
      url: api.personnalMethod+'/informationMain/updateAbroafdstudyInfo',
      method: 'post',
      data
    })
  }
  //删除留学经历
  static deleteAbroafdstudyInfoById(data) {
    return request({
      url: api.personnalMethod+'/informationMain/deleteAbroafdstudyInfoById',
      method: 'post',
      data
    })
  }

  //批量删除留学经历
  static deleteAbroafdstudyInfoByIds(data) {
    return request({
      url: api.personnalMethod+'/informationMain/deleteAbroafdstudyInfoByIds',
      method: 'post',
      data
    })
  }

  //批量删除留学经历
  static authentication(data) {
    return request({
      url: api.personnalMethod+'/informationMain/authentication',
      method: 'post',
      data
    })
  }

  //提交上传信息
  static insertRealIdentity(data) {
    return request({
      url: api.personnalMethod+'/informationMain/insertRealIdentity',
      method: 'post',
      data
    })
  }
  //查询个人信息
  static queryPerInfo(data) {
    return request({
      url: api.personnalMethod+'/informationMain/queryPerInfo',
      method: 'post',
      data
    })
  }
}
