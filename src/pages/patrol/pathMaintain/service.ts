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

export async function getPathPages(data: any) {
  return request('/api/biz/insp-patrol/patrol-path/page', {
    method: 'POST',
    data,
  });
}

export async function getPathById(patrolPathId: any) {
  return request(`/api/biz/insp-patrol/patrol-path/${patrolPathId}`, {
    method: 'GET',
  });
}

export async function Delete(patrolPathId: any) {
  return request(`/api/biz/insp-patrol/patrol-path/${patrolPathId}`, {
    method: 'DELETE',
  });
}

export async function creatPath(data: any) {
  const newdata = {
    patrolPath: {inspPatrolPathName: data?.pathName},
    patrolPathNodeList: _.map(data?.roadInfo, (item: any) => ({
      intIntersectionId: item?.intersectionId,
      intIntersectionName: item?.title,
    }))
  }
  return request('/api/biz/insp-patrol/patrol-path/', {
    method: 'POST',
    data: newdata,
  });
}

export async function updatePath(patrolPathId:any, data: any) {
  const newdata = {
    patrolPath: {inspPatrolPathName: data?.pathName},
    patrolPathNodeList: _.map(data?.roadInfo, (item: any) => ({
      intIntersectionId: item?.intersectionId,
      intIntersectionName: item?.title,
    }))
  }
  return request(`/api/biz/insp-patrol/patrol-path/${patrolPathId}`, {
    method: 'PATCH',
    data: newdata,
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
