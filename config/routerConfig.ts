/*
 * @Author: Dad
 * @Date: 2021-03-09 09:01:56
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-29 15:22:12
 */
import { USER_ADMIN, USER_MANAGER, USER_ENGINEER } from '../src/const';

export const router = [
  //USER
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'login',
        component: './user/login',
      },
      {
        name: 'register-result',
        icon: 'smile',
        path: '/user/register-result',
        component: './user/register-result',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './user/register',
      },
      {
        component: '404',
      },
    ],
  },
  //APP
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/utils/Authorized'],
    routes: [
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        path: '/dashboard',
        name: '首页',
        icon: 'dashboard',
        authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
        routes: [
          {
            path: '/dashboard',
            redirect: '/dashboard/amap',
          },
          {
            name: '地图',
            icon: 'smile',
            path: '/dashboard/amap',
            component: './dashboard/amap',
            authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
            hideInMenu: true,
          },
          {
            name: '配时方案',
            icon: 'smile',
            path: '/dashboard/timingplan',
            component: './dashboard/timingplan',
            authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/eam',
        name: '台账',
        icon: 'table',
        authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
        component: './eam',
        routes: [
          {
            path: '/eam',
            redirect: '/eam/intersection',
          },
          {
            name: '路口信息',
            icon: 'table',
            path: '/eam/intersection',
            authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
            component: './eam/intersection',
          },
          {
            name: '流量管理',
            icon: 'table',
            path: '/eam/flow',
            authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
            component: './eam/flow',
          },
          {
            name: '图片与文件管理',
            icon: 'table',
            path: '/eam/fileAndImg',
            authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
            component: './eam/fileAndImg',
          },
          {
            name: '图片详情',
            icon: 'table',
            path: '/eam/fileAndImg/edit',
            authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
            component: './eam/fileAndImg/image/management/edit',
            hideInMenu: true,
          },
          {
            name: '设备设施管理',
            icon: 'table',
            path: '/eam/facilities',
            authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
            component: './eam/facilities',
          },
          {
            name: '信号灯管理',
            icon: 'table',
            path: '/eam/light',
            authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
            component: './eam/light/manager',
          },
          {
            name: '路口环境因素',
            icon: 'table',
            path: '/eam/environment',
            authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
            component: './eam/environment',
          },
          {
            name: '路口维护记录',
            icon: 'smile',
            path: '/eam/maintenance',
            authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
            component: './eam/maintenance',
          },
        ],
      },
      {
        path: '/opinion',
        name: '舆情',
        icon: 'table',
        authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
        routes: [
          {
            path: '/opinion',
            redirect: '/opinion/list',
          },
          {
            name: '舆情列表',
            icon: 'table',
            path: '/opinion/add',
            authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
            component: './opinion/list',
            hideInMenu: false,
          },
          {
            name: '舆情详情',
            icon: 'table',
            path: '/opinion/detail',
            authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
            component: './opinion/components/detail',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/patrol',
        name: '巡检',
        icon: 'table',
        authority: [USER_ADMIN, USER_MANAGER],
        routes: [
          {
            path: '/patrol',
            redirect: '/patrol/task',
          },
          {
            name: '巡检任务',
            icon: 'table',
            path: '/patrol/task',
            authority: [USER_ADMIN, USER_MANAGER],
            component: './patrol/task',
          },
          {
            name: '路口巡检',
            icon: 'table',
            path: '/patrol/intersectionPatrol',
            authority: [USER_ADMIN, USER_MANAGER],
            component: './patrol/intersectionPatrol',
          },
          {
            name: '巡检清单',
            icon: 'table',
            path: '/patrol/intersectionPatrolList',
            authority: [USER_ADMIN, USER_MANAGER],
            component: './patrol/intersectionPatrol/list',
            hideInMenu: true,
          },
          {
            name: '提交巡检报告',
            icon: 'table',
            path: '/patrol/submitReport',
            authority: [USER_ADMIN, USER_MANAGER],
            component: './patrol/intersectionPatrol/SubmitReport',
            hideInMenu: true,
          },
          {
            name: '查看巡检报告',
            icon: 'table',
            path: '/patrol/AuditReport',
            authority: [USER_ADMIN, USER_MANAGER],
            component: './patrol/intersectionPatrol/AuditReport',
            hideInMenu: true,
          },
          {
            name: '路径巡检',
            icon: 'table',
            path: '/patrol/pathPatrol',
            authority: [USER_ADMIN, USER_MANAGER],
            component: './patrol/pathPatrol',
          },
          {
            name: '路线维护',
            icon: 'table',
            path: '/patrol/pathMaintain',
            authority: [USER_ADMIN, USER_MANAGER],
            component: './patrol/pathMaintain',
          },
          {
            name: '驾车巡检',
            icon: 'table',
            path: '/patrol/template/car',
            authority: [USER_ADMIN, USER_MANAGER],
            component: './patrol/template/car',
            hideInMenu: true,
          },
          {
            name: '平台巡检',
            icon: 'table',
            path: '/patrol/template/platform',
            authority: [USER_ADMIN, USER_MANAGER],
            component: './patrol/template/platform',
            hideInMenu: true,
          },
          {
            name: '路线列表',
            icon: 'table',
            path: '/patrol/list',
            authority: [USER_ADMIN, USER_MANAGER],
            component: './patrol/pathMaintain/list',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/patrol2',
        name: '巡检',
        icon: 'table',
        authority: [USER_ADMIN, USER_ENGINEER],
        routes: [
          {
            path: '/patrol2',
            redirect: '/patrol2/task',
          },
          {
            name: '巡检任务',
            icon: 'table',
            path: '/patrol2/task',
            authority: [USER_ADMIN, USER_ENGINEER],
            component: './patrol2/task',
          },
          {
            name: '路口巡检',
            icon: 'table',
            path: '/patrol2/intersectionPatrol',
            authority: [USER_ADMIN, USER_ENGINEER],
            component: './patrol2/intersectionPatrol',
          },
          {
            name: '巡检清单',
            icon: 'table',
            path: '/patrol2/intersectionPatrolList',
            authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
            component: './patrol2/intersectionPatrol/list',
            hideInMenu: true,
          },
          {
            name: '提交巡检报告',
            icon: 'table',
            path: '/patrol2/submitReport',
            authority: [USER_ADMIN, USER_ENGINEER],
            component: './patrol2/intersectionPatrol/SubmitReport',
            hideInMenu: true,
          },
          {
            name: '查看巡检报告',
            icon: 'table',
            authority: [USER_ADMIN, USER_ENGINEER],
            path: '/patrol2/AuditReport',
            component: './patrol2/intersectionPatrol/AuditReport',
            hideInMenu: true,
          },
          {
            name: '路径巡检',
            icon: 'table',
            authority: [USER_ADMIN, USER_ENGINEER],
            path: '/patrol2/pathPatrol',
            component: './patrol2/pathPatrol',
          },
          {
            name: '路线维护',
            icon: 'table',
            path: '/patrol2/pathMaintain',
            authority: [USER_ADMIN, USER_ENGINEER],
            component: './patrol2/pathMaintain',
          },
          {
            name: '驾车巡检',
            icon: 'table',
            path: '/patrol2/template/car',
            authority: [USER_ADMIN, USER_ENGINEER],
            component: './patrol2/template/car',
            hideInMenu: true,
          },
          {
            name: '平台巡检',
            icon: 'table',
            path: '/patrol2/template/platform',
            authority: [USER_ADMIN, USER_ENGINEER],
            component: './patrol2/template/platform',
            hideInMenu: true,
          },
          {
            name: '路线列表',
            icon: 'table',
            path: '/patrol2/list',
            authority: [USER_ADMIN, USER_ENGINEER],
            component: './patrol2/pathMaintain/list',
            hideInMenu: true,
          },
        ],
      },
      {
        name: '用户设置',
        icon: 'user',
        path: '/account/settings',
        hideInMenu: true,
        authority: [USER_ADMIN, USER_MANAGER, USER_ENGINEER],
        component: './account/settings',
      },
      {
        component: '404',
      },
    ],
  },
];
