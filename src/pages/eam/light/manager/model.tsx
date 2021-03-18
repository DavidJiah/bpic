/*
 * @Author: Dad
 * @Date: 2021-03-13 14:38:33
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-13 15:32:45
 */
import type { Reducer } from 'umi';

export interface ModalState {
  list: any[]
}

export interface ModelType {
  namespace: string;
  state: ModalState;
  reducers: {
    setPhases: Reducer<ModalState>;
   
  };
  effects: {
  };
}

const initState = {
    list: []
};

const Model: ModelType = {
  namespace: 'light',
  state: initState,
  effects: {
  },
  reducers: {
    setPhases(state, { payload }) {
      return { ...state, list: payload}
    }
  },
};

export default Model;
