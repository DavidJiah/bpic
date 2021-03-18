/*
 * @Author: Dad
 * @Date: 2021-03-12 15:30:38
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-15 11:35:09
 */
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { ModalState } from './model';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import RoadTree from '@/components/Intersection/RoadTree';
import ProCard from '@ant-design/pro-card';
import styles from './style.less';
import { QueryFilter, ProFormSelect } from '@ant-design/pro-form';

import {
  Table1
} from './components'

interface FacilitiesProps {
  state: ModalState;
  dispatch: Dispatch<any>;
  loading: boolean;
}
class IntersectionMaintenanceRecord extends Component<FacilitiesProps> {
  state = {
    markerLnglat: []
  }

  render() {
    return (
      <GridContent>
        <React.Fragment>
          <ProCard split="vertical" className={styles.bg}>
            <ProCard title="益阳市" colSpan="260px" className={styles.bg}>
              <RoadTree />
            </ProCard>
            <ProCard title="万达片区-龙州路-关公路路口" className={styles.bg}>

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
)(IntersectionMaintenanceRecord);
