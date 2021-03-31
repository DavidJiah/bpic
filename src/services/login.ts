/*
 * @Author: Dad
 * @Date: 2021-03-16 18:03:23
 * @LastEditTime: 2021-03-27 09:30:46
 * @LastEditors: Dad
 * @Description: 
 */
import request from '@/utils/request';
import md5 from 'js-md5';
import axios from 'axios';

export type LoginParamsType = {
  userCode: string;
  password: string;
};

export async function AccountLogin(data: LoginParamsType): Promise<any> {
  return axios.post('/api/login', {
    userCode: data?.userCode,
    password: data?.password,
  });
}
export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
