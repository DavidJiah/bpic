/*
 * @Author: Dad
 * @Date: 2021-03-10 16:35:45
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-15 17:13:51
 */
import { connect } from 'umi';
import type { ModalState } from '@/pages/dashboard/timingplan/model';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { SchedulingPlan, Solution, PlanRange, PlanTable, Phasesc } from '@/pages/dashboard/timingplan/components'

class Edit extends Component<any> {
  state = {
    markerLnglat: []
  }
  get PhasescProps() {
    const { dispatch, timingPlan } = this.props
    const { phasescs, editPhase } = timingPlan;
    return {
      editPhase,
      setEdit: (edit: any) => {
        dispatch({
          type: 'timingPlan/setEdit',
          payload: edit,
        });
      },
      phasescs,
      updatePhases: (list: any) => {
        dispatch({
          type: 'timingPlan/setPhases',
          payload: list,
        });
      },
    };
  }
  get PlanProps() {
    const { dispatch, timingPlan, roadInfo } = this.props;
    const { intersectionId } = roadInfo;
    const { phasescs } = timingPlan
    return {
      phasescs,
      intersectionId,
      updatePhases: (list: any) => {
        dispatch({
          type: 'timingPlan/setPhases',
          payload: list,
        });
      },
      setEdit: (edit: any) => {
        dispatch({
          type: 'timingPlan/setEdit',
          payload: edit,
        });
      },
    }
  }

  render() {
    const { PhasescProps, PlanProps } = this;
    const { intersectionId } = this.props
    return (
      <GridContent>
        <Phasesc {...PhasescProps} intersectionId={intersectionId} />
        <PlanTable {...PlanProps} intersectionId={intersectionId} />
        <PlanRange intIntersectionId={intersectionId} />
        <SchedulingPlan intersectionId={intersectionId} />
        <Solution intersectionId={intersectionId} />
      </GridContent>
    );
  }
}

export default connect(
  ({
    timingPlan,
    loading,
  }: {
    timingPlan: ModalState;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    timingPlan,
    loading: loading.models.timingPlan,
  }),
)(Edit);
