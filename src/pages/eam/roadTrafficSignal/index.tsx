import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { ModalState } from './model';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import RoadTree from '@/components/Intersection/RoadTree'
import ProCard from '@ant-design/pro-card';
import styles from './style.less';
import {QueryFilter,ProFormSelect} from '@ant-design/pro-form';
import {
  Table1
} from './components'

interface FacilitiesProps {
  state: ModalState;
  dispatch: Dispatch<any>;
  loading: boolean;
}

class RoadTrafficSignal extends Component<FacilitiesProps> {
  state = {
    markerLnglat: []
  } 
   
  render() {
    return (
      <GridContent>
        <React.Fragment>
          <ProCard split="vertical" className={styles.bg}> 
            <ProCard title="益阳市" colSpan="260px" className={styles.bg}>
              <RoadTree onSelect={} />
            </ProCard>
            <ProCard title="万达片区-龙州路-关公路路口" className={styles.bg}>
              <QueryFilter layout="horizontal">  
                <ProFormSelect
                  name="a1"
                  label="类型"
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
                  name="a1"
                  label="日期"
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
                  label="操作人"
                  valueEnum={{ 
                  }}
                  fieldProps={{
                    mode: 'multiple',
                  }}
                  placeholder="请选择入口方向"
                  rules={[{ required: true, message: '请选择入口方向', type: 'array' }]}
                />
                 <ProFormSelect
                  name="a1"
                  label="路口名称"
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
              </QueryFilter>
              <Table1 />
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
)(RoadTrafficSignal);
