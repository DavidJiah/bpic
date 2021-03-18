/*
 * @Author: Dad
 * @Date: 2021-03-15 11:33:33
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-15 11:36:07
 */
import { connect } from 'umi';
import type { ModalState } from './model';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import RoadTree from '@/components/Intersection/RoadTree'
import ProCard from '@ant-design/pro-card';
import styles from './style.less';
import { QueryFilter, ProFormSelect } from '@ant-design/pro-form';

import {
  Table1,
  Table2,
  Table3,
  Table4,
  Table5,
  Table6,
  Table7
} from './components'

interface FacilitiesProps {
  state: ModalState;
  dispatch: any;
  loading: boolean;
}

class Facilities extends Component<FacilitiesProps> {
  state = {
    markerLnglat: []
  }

  render() {
    return (
      <GridContent>
        <React.Fragment>
          <ProCard split="vertical" className={styles.bg}>
            <ProCard title="益阳市" colSpan="260px" className={styles.bg}>
              <RoadTree onSelect={this.onSelect} />
            </ProCard>
            <ProCard title="万达片区-龙州路-关公路路口" className={styles.bg}>
              <QueryFilter layout="horizontal">
                <ProFormSelect
                  name="a1"
                  label="设备类型"
                  valueEnum={{
                    1: '设备1',
                    2: '设备2',
                    3: '设备3',
                    4: '设备4',
                    5: '设备5',
                  }}
                  fieldProps={{
                    mode: 'multiple',
                  }}
                  placeholder="请选择设备类型"
                  rules={[{ required: true, message: '请选择设备类型', type: 'array' }]}
                />
                <ProFormSelect
                  name="a2"
                  label="入口方向"
                  initialValue="北"
                  valueEnum={{
                    '东': '东',
                    '南': '南',
                    '西': '西',
                    '北': '北'
                  }}
                  placeholder="请选择入口方向"
                />
              </QueryFilter>
              <Table1 intersectionId={this.state.intersectionId} entranceExitDirection={this.state.entranceExitDirection} />
              <Table2 />
              <Table3 />
              <Table4 />
              <Table5 />
              <Table6 />
              <Table7 />
            </ProCard>
          </ProCard>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(
  ({
    state,
    loading,
  }: {
    state: ModalState;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    state,
    loading: loading.models.timingPlan,
  }),
)(Facilities);
