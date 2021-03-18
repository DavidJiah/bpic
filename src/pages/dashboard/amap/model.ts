import type { Effect, Reducer } from 'umi';
import { queryIntersectionList,queryIntersectionByid,queryEquipmentByIntersectionId,queryFilePage,queryEquipmentDateil } from './service';


export interface ModalState {
  currentItem?: string,
  modalVisible?: boolean,
  modalType?: string,
  cardVisible?: boolean,
  intersection?: any,
  equipment?: [],
  intersections?: [],
  imageList?: []
}

export interface ModelType {
  namespace: string;
  state: ModalState;
  reducers: {
    showRoadModal: Reducer<ModalState>;
    hideRoadModal: Reducer<ModalState>;
    hideCard: Reducer<ModalState>;
    queryDateilData: Reducer<ModalState>;
    queryIntersectionData: Reducer<ModalState>;
  };
  effects: {
    fetch: Effect,
    showDetail: Effect,
  };
}

const initState = {
  currentItem: '',
  modalVisible: false,
  modalType: 'create',
  cardVisible: false,
  intersection: {},
  equipment: [],
  intersections: [],
  imageList:[]
};

const Model: ModelType = {
  namespace: 'amap',
  state: initState,
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryIntersectionList, payload);
      yield put({
        type: 'queryIntersectionData',
        payload: Array.isArray(response.data) ? response.data : [],
      }); 
    },
    *showDetail({ payload }, { call, put }) {
      const resIntersection = yield call(queryIntersectionByid, payload);
      const resEquipment = yield call(queryEquipmentByIntersectionId, payload);
      const resFile = yield call(queryFilePage, {size:-1,template: {businessId:resIntersection.data.id,groupCode: 'Default',businessType:'entranceexit',moduleCode:'uscp'}})
       
      yield put({
        type: 'queryDateilData',
        payload:  { intersection: resIntersection.data,equipment:resEquipment.data,imageList: resFile.data.records }
      });
    }
  },
  reducers: {
    queryDateilData(state, { payload }) {
      return { ...state, ...payload,cardVisible: true}
    }, 
    queryIntersectionData(state, { payload }) {
      return { ...state, intersections:payload}
    },
    showRoadModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideRoadModal(state, { payload }) {
      return { ...state,...payload, modalVisible: false }
    },
    hideCard(state, { payload }) {
      return { ...state,...payload, cardVisible: false }
    },
  },
};

export default Model;
