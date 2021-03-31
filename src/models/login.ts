/*
 * @Author: Dad
 * @Date: 2021-03-08 16:20:04
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-30 17:44:13
 */
import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { AccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { removeToken, removeType, setToken } from '@/utils/cookie';
import { message } from 'antd';
import { reloadAuthorized } from '@/utils/Authorized';

export type StateType = {
  status?: [];
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(AccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (response.data.code == 0) {
        message.success(response.msg);
        history.push('/');
      } else message.error('账户或密码错误');
    },

    logout() {
      if (window.location.pathname !== '/user/login') {
        //清除所有权限信息以及token
        setAuthority('');
        removeToken();
        removeType();
        //跳转
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // 设置token
      payload?.headers?.token && setToken(payload.headers.token);
      // 设置权限
      setAuthority(payload.data.data.userCode);
      //更新权限
      reloadAuthorized();
      return {
        ...state,
        status: payload,
      };
    },
  },
};

export default Model;
