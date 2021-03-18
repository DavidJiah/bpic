/*
 * @Author: Dad
 * @Date: 2021-03-08 16:20:04
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-11 09:16:33
 */
import { message } from 'antd';
import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getList } from './service';

interface ModelType {
  namespace: string;
  state: any;
  effects: {
    fetchList: Effect;
  };
  reducers: {
    setList: Reducer;
  };
}

const Model: ModelType = {
  namespace: 'intersectionList',
  state: {
    tableList: [],
    total: 0,
  },

  effects: {
    *fetchList({ queryParams, callback }, { call, put }) {
      const { code, data, msg } = yield call(getList, queryParams);
      if (code == 0) {
        yield put({
          type: 'setList',
          payload: data,
        });
      } else message.error(msg);
    },
  },

  reducers: {
    setList(state, { payload }) {
      return {
        ...state,
        tableList: payload,
      };
    },
  },
};

export default Model;
