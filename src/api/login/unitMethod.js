import request from '@/utils/request'

const api = {
  nationalityApi: '/backmanage/nationality',
  dictData: '/system/dict/data'
}

/**
 * 获取国家信息
 * */
export function queryNationality (parameter) {
  return request({
    url: api.nationalityApi + '/queryNationality',
    method: 'get',
    params: parameter
  })
}

/**
 * 根据类型获取字典内容 返回数组
 * @param {String} dictType 字典类型
 */
export function getDictArray (dictType) {
  return request({
    url: api.dictData + '/type',
    method: 'get',
    params: { 'dictType': dictType }
  })
}

