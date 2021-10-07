import request from '@/utils/request'
// 修改联系方式
export function updataContentWay(way,code) {
  const data = {
    way,
    code
  }
  console.info(data)
  return request({
    url: '/personalcenter/personalCenter/updataContentWay',
    method: 'post',
    params: data
  })
}
