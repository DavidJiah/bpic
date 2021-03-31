/*
 * @Author: Dad
 * @Date: 2021-03-08 16:20:04
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-13 10:05:37
 */
import request from '@/utils/request';

export interface List {
  userName: string;
  password: string;
}

export async function getList(data: any) {
  return request(`/api/biz/intersection/${data?.intersectionId.toString()}/maintenance-records/page/`, {
    method: 'POST',
    data,
  });
}

export async function getIntersectionInfo() {
  return request('/api/biz/intersection/original-info', {
    method: 'GET',
  });
}

