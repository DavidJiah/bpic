/*
 * @Author: Dad
 * @Date: 2021-03-08 16:20:04
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-10 22:41:51
 */
import request from '@/utils/request';

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

export async function creatData(data: any) {
  return request('/api/biz/insp-patrol/daily-task/', {
    method: 'POST',
    data,
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
