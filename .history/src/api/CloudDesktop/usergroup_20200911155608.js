import request from '@/utils/request'
const desktop = '/desktop.v1.Ad'
/**
 * 获取OU列表
 * @param {data} data
 */
export function usermanageListusergroup (data = { name: 'ou=Group,ou=Citrix,dc=test,dc=com' }) {
  return request.post(`${desktop}/ListUserGroup`, data)
}
