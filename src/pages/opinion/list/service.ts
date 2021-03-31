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
  return request('/api/biz/insp-public-sentiment/page', {
    method: 'POST',
    data,
  });
}

export async function save(data: any) {
  return request('/api/biz/insp-public-sentiment/', {
    method: 'POST',
    data,
  });
}

export async function saveForm(data: any, id: any) {
  return request('/api/biz/insp-public-sentiment/' + id, {
    method: 'POST',
    data,
  });
}

export async function uplaodForm(data: any, id: any) {
  return request('/api/biz/insp-public-sentiment/' + id + '/detail', {
    method: 'PUT',
    data,
  });
}

export async function uplaod(data: any, id: any) {
  return request('/api/biz/insp-public-sentiment/' + id, {
    method: 'PUT',
    data,
  });
}

export async function Delete(id: any) {
  return request('/api/biz/insp-public-sentiment/' + id, {
    method: 'DELETE',
  });
}

export async function getIntersectionInfo() {
  return request('/api/biz/intersection/original-info', {
    method: 'GET',
  });
}

export async function getopInionInfo(id: any) {
  return request('/api/biz/insp-public-sentiment/' + id, {
    method: 'GET',
  });
}

export async function getImgurl(id: any) {
  return request('/api/file/' + id, {
    method: 'GET',
  });
}

export async function downDoc(code: any) {
  return request('/api/office/public-sentiment/' + code, {
    method: 'GET',
  });
}
