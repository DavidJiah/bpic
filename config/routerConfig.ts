/*
 * @Author: Dad
 * @Date: 2021-03-09 09:01:56
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-18 19:21:18
 */
import { USER_ADMIN, USER_ANON, USER_MANAGER, USER_ENGINEER } from '../src/const';

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
    // Routes: ['src/utils/Authorized'],
    routes: [
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        path: '/dashboard',
        name: '首页',
        icon: 'dashboard',
        // authority: [USER_ADMIN, USER_ANON, USER_MANAGER, USER_ENGINEER],
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
            hideInMenu: true,
          },
          {
            name: '配时方案',
            icon: 'smile',
            path: '/dashboard/timingplan',
            component: './dashboard/timingplan',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/eam',
        name: '台账',
        icon: 'table',
        // authority: [USER_ADMIN, USER_ANON, USER_MANAGER, USER_ENGINEER],
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
            component: './eam/intersection',
          },
          {
            name: '流量管理',
            icon: 'table',
            path: '/eam/flow',
            component: './eam/flow', 
          },
          {
            name: '图片与文件管理',
            icon: 'table',
            path: '/eam/fileAndImg',
            component: './eam/fileAndImg',
            hideInMenu: true,
          },
          {
            name: '图片详情',
            icon: 'table',
            path: '/eam/fileAndImg/edit',
            component: './eam/fileAndImg/image/management/edit',
            hideInMenu: true,
          },
          {
            name: '设备设施管理',
            icon: 'table',
            path: '/eam/facilities',
            component: './eam/facilities', 
          },
          {
            name: '信号灯管理',
            icon: 'table',
            path: '/eam/light',
            component: './eam/light/manager',
            hideInMenu: true,
          },
          {
            name: '路口环境因素',
            icon: 'table',
            path: '/eam/environment',
            component: './eam/environment', 
          },
          {
            name: '路口维护记录',
            icon: 'smile',
            path: '/eam/maintenance',
            component: './eam/maintenance', 
          },
        ],
      },
      {
        path: '/opinion',
        name: '舆情',
        icon: 'table',
        // authority: [USER_ADMIN, USER_ANON, USER_MANAGER, USER_ENGINEER],
        routes: [
          {
            path: '/opinion',
            redirect: '/opinion/list',
          },
          {
            name: '舆情列表',
            icon: 'table',
            path: '/opinion/add',
            component: './opinion/list',
            hideInMenu: false,
          },
          {
            name: '舆情详情',
            icon: 'table',
            path: '/opinion/detail',
            component: './opinion/components/detail',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/patrol',
        name: '巡检',
        icon: 'table',
        // authority: [USER_ADMIN, USER_ANON, USER_MANAGER, USER_ENGINEER],
        routes: [
          {
            path: '/patrol',
            redirect: '/patrol/task',
          },
          {
            name: '巡检任务',
            icon: 'table',
            path: '/patrol/task',
            component: './patrol/task',
            hideInMenu: false,
          },
          {
            name: '路口巡检',
            icon: 'table',
            path: '/patrol/intersectionPatrol',
            component: './patrol/intersectionPatrol',
            hideInMenu: false,
          },
          {
            name: '提交巡检报告',
            icon: 'table',
            path: '/patrol/submitReport',
            component: './patrol/intersectionPatrol/SubmitReport',
            hideInMenu: true,
          },
          {
            name: '查看巡检报告',
            icon: 'table',
            path: '/patrol/AuditReport',
            component: './patrol/intersectionPatrol/AuditReport',
            hideInMenu: true,
          },
          {
            name: '路径巡检',
            icon: 'table',
            path: '/patrol/pathPatrol',
            component: './patrol/pathPatrol',
            hideInMenu: false,
          },
          {
            name: '路线维护',
            icon: 'table',
            path: '/patrol/pathMaintain',
            component: './patrol/pathMaintain',
            hideInMenu: false,
          },
        ],
      },
      {
        name: '用户设置',
        icon: 'user',
        path: '/account/settings',
        hideInMenu: true,
        component: './account/settings',
      },
      {
        component: '404',
      },
    ],
  },
];
