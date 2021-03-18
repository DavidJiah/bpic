/*
 * @Author: Dad
 * @Date: 2021-03-17 09:36:53
 * @LastEditTime: 2021-03-18 10:07:10
 * @LastEditors: Dad
 * @Description:
 */
import type { Effect, Reducer } from 'umi';
import {
  queryList,
  queryEnvFactor,
  deleteEnvFactor,
  queryFilePage,
} from '@/pages/eam/environment/service';

export interface ModalState {
  currentItem?: string;
  modalVisible?: boolean;
  modalType?: string;
  cardVisible?: boolean;
  initialValues?: any;
  list?: any[];
  cardData?: any;
}
export interface ModelType {
  namespace: string;
  state: ModalState;
  reducers: {
    queryCardData: Reducer<ModalState>;
    queryList: Reducer<ModalState>;
    showRoadModal: Reducer<ModalState>;
    hideRoadModal: Reducer<ModalState>;
    hideCard: Reducer<ModalState>;
  };
  effects: {
    fetch: Effect;
    showCard: Effect;
    delete: Effect;
  };
}

const initState = {
  currentItem: '',
  modalVisible: false,
  modalType: 'create',
  initialValues: {},
  cardVisible: false,
  list: [],
  cardData: {
    list: [],
    title: '',
    intersectionId: '',
  },
};

const Model: ModelType = {
  namespace: 'pathMaintain',
  state: initState,
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *showCard({ payload }, { call, put }) {
      const response = yield call(queryEnvFactor, payload);
      let list = response.data ? response.data : [];
      if (list.length >= 1) {
        const valueList = response.data.map((data: any) => `${data.intIntersectionId}-${data.id}`);
        const resFile = yield call(queryFilePage, {
          conditions: [{ column: 'businessId', option: 'in', valueList }],
          size: -1,
          template: { groupCode: 'Default', businessType: 'envfactor', moduleCode: 'uscp' },
        });
        list = list.map((item1: any) => {
          item1.fileList = resFile.data.records
            .filter((item: any) => item.businessId === `${item1.intIntersectionId}-${item1.id}`)
            .map((fitem: any) => {
              return { url: `http://116.63.45.33:8888/file/download/${fitem.id}` };
            });
          return item1;
        });
      }
      yield put({
        type: 'queryCardData',
        payload: { list, title: payload.title, intersectionId: payload.intersectionId },
      });
    },
    *delete({ payload }, { call, put }) {
      yield call(deleteEnvFactor, payload);
      const response = yield call(queryEnvFactor, payload);
      yield put({
        type: 'queryCardData',
        payload: {
          list: response.data ? response.data : [],
          intersectionId: payload.intersectionId,
        },
      });
    },
  },
  reducers: {
    queryList(state, { payload }) {
      return { ...state, list: payload };
    },
    showRoadModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true };
    },
    hideRoadModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: false };
    },
    queryCardData(state, { payload }) {
      return { ...state, cardData: payload, cardVisible: true };
    },
    hideCard(state, { payload }) {
      return { ...state, ...payload, cardVisible: false };
    },
  },
};

export default Model;
