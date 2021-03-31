import { connect } from 'umi';
import React, { Component } from 'react';
import type { ModalState } from '@/pages/eam/environment/model';
import { AMapScene } from '@antv/l7-react';
import AMarker from './AMarker';
import { Button, Drawer, Space } from 'antd';
import _ from 'lodash';
import { history } from 'umi';

interface Props {
  pathMaintain: ModalState;
  dispatch: any;
  loading: boolean;
  list: any[];
}


class Comp extends Component<Props> {
  state = {
    markerLnglat: [], //坐标
    roadInfo: [], //点击的路口信息
    visible: true, //弹窗显隐
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'pathMaintain/hideCard',
      payload: {
        cardVisible: false,
      },
    });
    dispatch({
      type: 'pathMaintain/fetch',
      payload: {
        count: 5,
      },
    });
  }

  get aMarkerProps() {
    const { pathMaintain } = this.props;
    let { list } = pathMaintain;
    const self = this;
    const tlist = list || [];
    return {
      list: tlist.map((e: any) => {
        return {
          id: e.intIntersection.id,
          title: e.intIntersection.intIntersectionName,
          lnglat: [
            e.intIntersection.intIntersectionLatitude,
            e.intIntersection.intIntersectionLongitude,
          ],
        };
      }),
      onAdd(obj: any) {
        const item = self.state.roadInfo.find((item: any) => obj?.intersectionId == item?.intersectionId) // 防止数组加入相同的值
        if (!item) {
          self.setState({
            roadInfo: [...self.state.roadInfo, obj]
          })
        }
      },
    };
  }

  render() {
    const self = this;
    const { dispatch } = this.props;
    const { aMarkerProps } = this;
    const { roadInfo } = this.state;
    return (
      <>
        <AMapScene
          map={{
            resizeEnable: true,
            center: [112.36229441821575, 28.56552675407389],
            pitch: 45,
            style: 'dark',
            zoom: 16,
            plugin: ['AMap.ElasticMarker', 'AMap.Weather'],
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onSceneLoaded={({ map }: any) => {
            map.on('dblclick', (msg: any) => {
              self.setState({ markerLnglat: [msg.lnglat.R, msg.lnglat.Q] });
            });
            map.on('click', () => {
              dispatch({
                type: 'pathMaintain/hideCard',
                payload: {
                  cardVisible: true,
                },
              });
            });
          }}
        >
          <div>
            <Drawer
              title="创建巡检清单"
              placement="right"
              closable={false}
              mask={false}
              onClose={() => { this.setState({ visible: false }) }}
              visible={this.state.visible}
              getContainer={false}
              style={{ position: 'absolute', width: '13%' }}
            >
              <ul style={{ padding: '0' }}>
                {roadInfo?.map((item: any) => (
                  <li>{item?.title}</li>
                ))}
              </ul>
              <Space style={{position: 'absolute', bottom: '20px'}}>
                <Button onClick={() => { history.goBack() }}>取消</Button>
                <Button type='primary' htmlType="submit" onClick={() => { }}>保存</Button>
              </Space>
            </Drawer>
          </div>
          <AMarker {...aMarkerProps} />
        </AMapScene>
      </>
    );
  }
}

export default connect(
  ({
    pathMaintain,
    loading,
  }: {
    pathMaintain: ModalState;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    pathMaintain,
    loading: loading.models.pathMaintain,
  }),
)(Comp);
