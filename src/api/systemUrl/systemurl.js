import request from '@/utils/request'


//查询系统地址列表
export  function ListSystemUrl(userType) {
  // const data ={
  //   "userType": userType
  // }
 return request({
   url: '/backmanage/url/SystemList?userType='+userType,
   method: 'get',
  // params: data
})
}
// 查询系统地址详细
export function getSystemUrl(id) {
  return request({
    url: '/backmanage/url/' + id,
    method: 'get'
  })
}
//新增系统地址
export function addSystemUrl(systemUrl) {
  return request({
    url: '/backmanage/url/save',
    method: 'post',
    data: systemUrl
  })
}
// 修改系统地址
export function updateSystemUrl(systemUrl) {
  return request({
    url: '/backmanage/url/update',
    method: 'put',
    data: systemUrl
  })
}
// 删除系统地址
export function delSystemUrl(id) {
  return request({
    url: '/backmanage/url/' + id,
    method: 'delete'
  })
}
