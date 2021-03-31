/*
 * @Author: Dad
 * @Date: 2021-03-08 16:20:04
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-10 22:41:51
 */
import request from '@/utils/request';
import _ from 'lodash'

export interface List {
  userName: string;
  password: string;
}

export async function submitAudit(dailyTaskId: any) {
  return request(`/api/biz/insp-patrol/patrol-schedule/submit/${dailyTaskId}`, {
    method: 'GET',
  });
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

export async function creatData(patrolScheduleId:any, data: any) {
  const newdata = {
    dailyTask: {},
    dailyTaskIntersectionList: _.map(data, (item): any => ({
      intIntersectionId: item?.intersectionId,
      intIntersectionName: item?.title,
    }))
  }
  return request(`/api/biz/insp-patrol/daily-task/${patrolScheduleId}`, {
    method: 'POST',
    data: newdata,
  });
}

export async function update(data: any, id: any) {
  return request('/api/biz/insp-patrol/daily-task/' + id, {
    method: 'PATCH',
    data,
  });
}

export async function getIntersectionInfo() {
  return request('/api/biz/intersection/original-info', {
    method: 'GET',
  });
}

export async function getIntersectionFiling() {
  return request('/api/biz/intersection/sys-info', {
    method: 'GET',
  });
}
