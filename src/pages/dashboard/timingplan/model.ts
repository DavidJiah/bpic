import type { Reducer } from 'umi';

export interface ModalState {
  phasescs: any[]
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
  phasescs: []
};

const Model: ModelType = {
  namespace: 'timingPlan',
  state: initState,
  effects: {
  },
  reducers: {
    setPhases(state, { payload }) {
      return { ...state, phasescs: payload}
    }
  },
};

export default Model;
