/*
 * @Author: Dad
 * @Date: 2021-03-10 16:35:45
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-15 17:13:51
 */
import { Col, Row } from 'antd';
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
    const { phasescs } = timingPlan
    return {
      phasescs,
      updatePhases: (list: any) => {
        dispatch({
          type: 'timingPlan/setPhases',
          payload: list,
        });
      }
    }
  }
  get PlanProps() {
    const { dispatch, timingPlan } = this.props
    const { phasescs } = timingPlan
    return {
      phasescs,
      updatePhases: (list: any) => {
        dispatch({
          type: 'timingPlan/setPhases',
          payload: list,
        });
      }
    }
  }

  render() {
    const { PhasescProps, PlanProps } = this
    return (
      <GridContent>
        <Phasesc  {...PhasescProps} />
        <PlanTable {...PlanProps} />
        <PlanRange />
        <SchedulingPlan intersectionId='10' />
        <Solution intersectionId='10' />
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
