/*
 * @Author: Dad
 * @Date: 2021-03-10 16:35:45
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-18 21:53:47
 */
import { Col, Row } from 'antd';
import { connect } from 'umi';
import type { ModalState } from './model';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import './style.less';
import { SchedulingPlan, Solution, PlanRange, PlanTable, Phasesc } from './components';

interface TimingPlanProps {
  timingPlan: ModalState;
  dispatch: any;
  loading: boolean;
}

class TimingPlan extends Component<TimingPlanProps> {
  state = {
    markerLnglat: [],
  };
  get PhasescProps() {
    const { dispatch, timingPlan } = this.props;
    const { phasescs } = timingPlan;
    return {
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
    const { dispatch, timingPlan } = this.props;
    const { phasescs } = timingPlan;
    return {
      phasescs,
      updatePhases: (list: any) => {
        dispatch({
          type: 'timingPlan/setPhases',
          payload: list,
        });
      },
    };
  }

  render() {
    const {
      PhasescProps,
      PlanProps,
      props: {
        location: {
          query: { id },
        },
      },
    } = this;
    return (
      <GridContent>
        <React.Fragment>
          <Row gutter={24} style={{ margin: 0, padding: 0 }}>
            <Col span={24} style={{ margin: 0, padding: 0 }}>
              <Phasesc {...PhasescProps} intersectionId={id} />
              <PlanTable {...PlanProps} intIntersectionId={id} />
              <PlanRange intIntersectionId={id} />
              <SchedulingPlan intersectionId={id} />
              <Solution intersectionId={id} />
            </Col>
          </Row>
        </React.Fragment>
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
)(TimingPlan);
