import request from '@/utils/request'

/**
 *  获取部门列表
 * @param {data} data
 */
export function departmentList (data) {
    return request.post('/system.v1.Department/List', data)
}
/**
 *  获取部门列表
 * @param {data} data
 */
export function departmentAdd (data) {
    return request.post('/system.v1.Department/Add', data)
}
/**
 *  删除部门
 * @param {data} data
 */
export function departmentDelete (data) {
    return request.post('/system.v1.Department/Delete', data)
}
/**
 *  修改部门
 * @param {data} data
 */
export function departmentPatch (data) {
    return request.post('/system.v1.Department/Patch', data)
}
