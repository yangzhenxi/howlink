// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import * as icon from '@/core/icons'
const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: RouteView,
        redirect: { name: 'clientManage' },
        // component: () => import('@/views/client/ClientManage/index'),
        meta: { title: '客户管理', keepAlive: true, icon: icon.bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/client/clientManage',
            name: 'clientManage',
            component: () => import('@/views/client/ClientManage/index'),
            meta: { title: '客户管理', keepAlive: true, icon: icon.bxAnaalyse, permission: ['dashboard'] }
          },
          {
            path: '/client/Machine',
            name: 'Machine',
            component: () => import('@/views/client/Machine/index'),
            meta: { title: '机器码管理', keepAlive: true, icon: icon.bxAnaalyse, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/license',
        name: 'license',
        component: RouteView,
        redirect: { name: 'clientManage' },
        meta: { title: '授权码管理', keepAlive: true, icon: icon.bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/license/CDM',
            name: 'CDM',
            component: () => import('@/views/license/CDM/index'),
            meta: { title: '灵备授权码', keepAlive: true, icon: icon.bxAnaalyse, permission: ['dashboard'] }
          }
        ]
      },

      // // 云桌面架构
      // {
      //   path: '/system/organization',
      //   name: 'system',
      //   component: () => import('@/views/client/ClientManage/index'),
      //   meta: { title: '客户管理', keepAlive: true, icon: icon.bxAnaalyse, permission: ['dashboard'] }
      // },
      // 系统
      {
        path: '/system/organization',
        name: 'system',
        component: RouteView,
        meta: { title: '系统管理', keepAlive: true, icon: icon.system, permission: ['system'] },
        children: [
          {
            path: '/system/role',
            name: 'role',
            component: () => import('@/views/system/role'),
            meta: { title: '角色管理', keepAlive: true, icon: icon.role, permission: ['role'] }
          },
          {
            path: '/system/user',
            name: 'user',
            component: () => import('@/views/system/user'),
            meta: { title: '用户管理', keepAlive: true, icon: icon.user, permission: ['user'] }
          },
          {
            path: '/system/info',
            name: 'info',
            component: () => import('@/views/system/info'),
            meta: { title: '个人信息', keepAlive: false, icon: icon.user, permission: ['info'] },
            redirect: '/system/info/modules/base',
            hideChildrenInMenu: true,
            hidden: true,
            children: [
                {
                  path: '/system/info/modules/base',
                  name: 'BaseSettings',
                  component: () => import('@/views/system/info/modules/base'),
                  meta: { title: '基本设置', hidden: true, permission: [ 'system' ] }
                },
                {
                  path: '/system/info/modules/security',
                  name: 'SecuritySettings',
                  component: () => import('@/views/system/info/modules/Security'),
                  meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'system' ] }
                }
            ]
          },
          // {
          //   path: '/system/Log',
          //   name: 'Log',
          //   component: () => import('@/views/system/Log'),
          //   meta: { title: '用户日志', keepAlive: true, icon: icon.Log, permission: ['log'] }
          // },
          {
            path: '/system/aboutus',
            name: 'aboutus',
            component: () => import('@/views/system/aboutus'),
            meta: { title: '部门管理', keepAlive: true, icon: icon.aboutus, permission: ['dashboard'] }
          },
          {
            path: '/system/task',
            name: 'task',
            component: () => import('@/views/system/task'),
            meta: { title: '任务管理', keepAlive: true, icon: icon.task, permission: ['task'] }
          }
          // {
          //   path: '/system/alarm',
          //   name: 'alarm',
          //   component: () => import('@/views/system/alarm'),
          //   meta: { title: '警报管理', keepAlive: true, icon: icon.alarm, permission: ['alert'] }
          // }
        //   {
        //     path: '/system/Authorization',
        //     name: 'Authorization',
        //     component: () => import('@/views/system/Authorization'),
        //     meta: { title: '授权与服务', keepAlive: true, icon: icon.Authorization, permission: ['dashboard'] }
        //   }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  }
]
