import type { Reducer } from 'umi';

export interface ModalState {
  phasescs: any[],
  editPhase: any,
}

export interface ModelType {
  namespace: string;
  state: ModalState;
  reducers: {
    setPhases: Reducer<ModalState>;
    setEdit: Reducer<ModalState>;
  };
  effects: {
  };
}

const initState = {
  phasescs: [],
  editPhase: false
};

const Model: ModelType = {
  namespace: 'timingPlan',
  state: initState,
  effects: {
  },
  reducers: {
    setPhases (state: any, { payload }) {
      return { ...state, phasescs: payload}
    },
    setEdit(state: any, { payload }) {
      return { ...state, editPhase: payload}
    }
  },
};

export default Model;
