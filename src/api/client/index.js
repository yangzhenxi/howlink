import request from '@/utils/request'

/**
 *  客户获取列表
 * @param {data} data
 */
export function CustomertList () {
    return request.post('/customer.v1.Customer/List')
}
/**
 *  添加客户
 * @param {data} data
 */
export function CustomertAdd (data) {
    return request.post('/customer.v1.Customer/Add', data)
}
/**
 *  修改客户
 * @param {data} data
 */
export function CustomertPatch (data) {
    return request.post('/customer.v1.Customer/Patch', data)
}
/**
 *  删除客户
 * @param {data} data
 */
export function CustomertDelete (data) {
    return request.post('/customer.v1.Customer/Delete', data)
}
/**
 *  获取用户的uuid
 * @param {data} data
 */
export function CustomertCodes (data) {
    return request.post('/customer.v1.Customer/Codes', data)
}
