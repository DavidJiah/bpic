import request from '@/utils/request';
import md5 from 'js-md5';

export type LoginParamsType = {
  userCode: string;
  password: string;
};

export async function AccountLogin(data: LoginParamsType): Promise<any> {
  return request('/api/login', {
    method: 'POST',
    data: {
      userCode: data?.userCode,
      password: data?.password,
    },
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
