import request from '@/utils/request'
import { getToken } from '@/utils/auth'


const api = {
    personnalMethod: '/otherlogin/orgenUserlogin'
}
//登陆
export function orgLogin (username, password,uuid,deptName,joinsysCode) {
  const data = {
    username,
    password,
    uuid,
    deptName,
    joinsysCode
  }
    return request({
        url: api.personnalMethod + '/orgLogin',
        method: 'post',
        params: data
    })
}
//登出
export function orglogout (parameter) {
    return request({
        url: api.personnalMethod + '/loginOut',
        method: 'post',
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
