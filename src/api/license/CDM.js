import request from '@/utils/request'
/**
 *  获取CDM授权码列表
 * @param {data} data
 */
export function licenseList (data) {
    return request.post('/license.v1.Lb/List', data)
}
/**
 *  查看详情
 * @param {data} data
 */
export function licenseGet (data) {
    return request.post('/license.v1.Lb/Get', data)
}
/**
 *  添加授权码
 * @param {data} data
 */
export function licenseAdd (data) {
    return request.post('/license.v1.Lb/Add', data)
}
/**
 *  删除授权码
 * @param {data} data
 */
export function licenseDelete (data) {
    return request.post('/license.v1.Lb/Delete', data)
}
/**
 *  修改授权码
 * @param {data} data
 */
export function licensePatch (data) {
    return request.post('/license.v1.Lb/Patch', data)
}
