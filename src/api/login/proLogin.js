import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const api = {
    personnalMethod: '/personallogin/login'
}
//登陆
export function proLogin (username, password,uuid,joinsysCode) {
  const data = {
    username,
    password,
    uuid,
    joinsysCode
  }
    return request({
        url: api.personnalMethod + '/proLogin',
        method: 'post',
        params: data
    })
}
//登出
export function logout (parameter) {
    return request({
        url: api.personnalMethod + '/loginOut',
        method: 'post',
        params: parameter
    })
}
// 登陆出政务平台系统
export function logoutZW (parameter) {
  return request({
    url: 'http://p2.cscse.edu.cn/fronttest/jyb/logout',
    method: 'get',
    params: parameter
  })
}

//获取用户信息
export function getInfo () {
  const data ={
    "token":getToken(),
  }
  return request({
    url: api.personnalMethod + '/getInfo',
    method: 'post',
    params: data
  })
}
export function updateUserPwd (oldPassword,newPassword) {
  const parameter={
    oldPassword, newPassword
  }
  return request({
    url: api.personnalMethod + '/updateUserPwd',
    method: 'post',
    params: parameter
  })
}
//校验token
export function checkToken () {
  const data ={
    "token":getToken(),
  }
  return request({
    url: '/otherlogin/token/countToken',
    method: 'post',
    params: data
  })
}
// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/personalcenter/personalCenter/updateUserAvatar',
    method: 'post',
    data: data
  })
}



// 获取用户头像
export function getUserAvatar(data) {
  return request({
    url: '/personalcenter/personalCenter/getUserAvatar',
    method: 'get',
    data: data
  })
}


