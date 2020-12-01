import request from '@/utils/request'

/**
 *  获取机器码列表
 * @param {data} data
 */
export function CustomertCodeList (data) {
    return request.post('/customer.v1.Code/List', data)
}
/**
 *  机器码获取详情
 * @param {data} data
 */
export function CustomertCodeGet () {
    return request.post('/customer.v1.Code/Get')
}
/**
 *  添加机器码
 * @param {data} data
 */
export function CustomertCodeAdd (data) {
    return request.post('/customer.v1.Code/Add', data)
}
/**
 *  修改机器码
 * @param {data} data
 */
export function CustomertCodePatch (data) {
    return request.post('/customer.v1.Code/Patch', data)
}
/**
 *  删除机器码
 * @param {data} data
 */
export function CustomertCodeDelete (data) {
    return request.post('/customer.v1.Code/Delete', data)
}
