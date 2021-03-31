/*
 * @Author: Dad
 * @Date: 2021-03-08 16:20:04
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-25 20:41:49
 */
import moment from 'moment';
import request from '@/utils/request';
import _ from 'lodash'

export interface List {
  userName: string;
  password: string;
}

export async function getpages(data: any) {
  return request('/api/biz/insp-patrol/daily-task/page', {
    method: 'POST',
    data,
  });
}

export async function Delete(id: any) {
  return request('/api/biz/insp-patrol/daily-task/' + id, {
    method: 'DELETE',
  });
}

//新增巡检单
export async function creatData(data: any, checkedList: any) {
  debugger
  return request('/api/biz/insp-patrol/patrol-schedule/', {
    method: 'POST',
    data: {
      patrolSchedule: {
        inspScheduleBeginDate: new Date(data?.dateRange[0]).getTime(),
        inspScheduleEndDate: new Date(data?.dateRange[1]).getTime(),
      },
      patrolScheduleIntersectionList: checkedList,
    },
  });
}

export async function update(data: any, id: any) {
  return request('/api/biz/insp-patrol/patrol-schedule/' + id, {
    method: 'PATCH',
    data,
  });
}

export async function getIntersectionFiling() {
  return request('/api/biz/intersection/sys-info', {
    method: 'GET',
  });
}
//关联路口
export async function getIntersectionInfo() {
  return request('/api/biz/intersection/original-info', {
    method: 'GET',
  });
}

// 项目经理获取巡检任务list
export async function fetchList(data: any) {
  return request('/api/biz/insp-patrol/patrol-schedule/manager-page', {
    method: 'POST',
    data,
  });
}

// 派单
export async function distributeTask(patrolScheduleId: any, userCode: any) {
  return request(`/api/biz/insp-patrol/patrol-schedule/assignment/${patrolScheduleId}/userCode/${userCode}`, {
    method: 'POST',
  });
}

//删除巡检单
export async function deleteOrder(data: number) {
  return request(`/api/biz/insp-patrol/patrol-schedule/${data}`, {
    method: 'DELETE',
  });
}
