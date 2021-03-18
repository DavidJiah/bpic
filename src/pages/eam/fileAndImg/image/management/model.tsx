/*
 * @Author: Dad
 * @Date: 2021-03-11 10:29:42
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-11 15:49:00
 */
import { message } from 'antd';
import { Effect, Reducer } from 'umi';

import { getImageList } from '../../services';

export interface StateType {
  list: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'imageManage',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { code, data, msg } = yield call(getImageList, payload);
      if (code == 0) {
        yield put({
          type: 'queryList',
          payload: data,
        });
      } else message.error(msg)
    },
  },

  reducers: {
    queryList(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
  },

};

export default Model;
