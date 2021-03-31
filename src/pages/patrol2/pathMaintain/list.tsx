import { connect } from 'umi';
import React, { Component } from 'react';
import type { ModalState } from '@/pages/eam/environment/model';
import { AMapScene, LineLayer } from '@antv/l7-react';
import AMarker from './AMarker';
import { Drawer, Button, Form, Input, Steps, Space } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { history } from 'umi';

interface Props {
  pathMaintain2: ModalState;
  dispatch: any;
  loading: boolean;
  list: any[];
}


class Comp extends Component<Props> {
  state = {
    markerLnglat: [], //坐标
    markerLng: [], //线
    roadInfo: [], //点击的路口信息
    visible: true, //弹窗显隐
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'pathMaintain2/hideCard',
      payload: {
        cardVisible: false,
      },
    });
    dispatch({
      type: 'pathMaintain2/fetch',
      payload: {
        count: 5,
      },
    });
  }

  get aMarkerProps() {
    const { pathMaintain2 } = this.props;
    let { list } = pathMaintain2;
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
        self.setState({
          markerLng: [...self.state.markerLng, obj.lnglat],
          roadInfo: [...self.state.roadInfo, obj],
        });
      },
    };
  }

  stepsTitle = (title: any) => {
    return (
      <div>
        <span style={{ marginRight: '10px' }}>{title}</span><CloseCircleOutlined />
      </div>
    )
  }

  save = (values: any) => {
    console.log(values?.pathName, this.state.roadInfo)
  }

  Detele = (index: any) => {
    console.log(index)
    index === 0 ? this.state.roadInfo.shift() : this.state.roadInfo.pop()
    this.setState({ roadInfo: this.state.roadInfo })
    console.log(this.state.roadInfo)
  }

  render() {
    const self = this;
    const { dispatch } = this.props;
    const { aMarkerProps } = this;
    const { markerLng, roadInfo } = this.state;
    const plist = [
      {
        type: 'Polygon',
        geometryCoord: [markerLng],
      },
    ];
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
                type: 'pathMaintain2/hideCard',
                payload: {
                  cardVisible: true,
                },
              });
            });
          }}
        >
          <div style={{ width: '100%' }}>
            <Drawer
              title="创建路线"
              placement="left"
              closable={false}
              mask={false}
              onClose={() => { this.setState({ visible: false }) }}
              visible={this.state.visible}
              getContainer={false}
              style={{ position: 'absolute', width: '16%' }}
            >
              <Form layout='vertical' onFinish={(values) => { this.save(values) }}>
                <Form.Item label='路线名称' name='pathName'>
                  <Input placeholder="请输入路线名称" />
                </Form.Item>
                <Form.Item name="intersectionList" label="选择的路口">
                  <Steps progressDot current={21} direction="vertical" size='small' onChange={(current) => { this.Detele(current) }}>
                    {roadInfo?.map((item: any, index: any) => (<Steps.Step title={this.stepsTitle(item?.title)} status={'finish'} disabled={index != 0 && index != (roadInfo.length - 1)} />))}
                  </Steps>
                </Form.Item>
                <Space>
                  <Button onClick={() => { history.goBack() }}>取消</Button>
                  <Button type='primary' htmlType="submit" onClick={() => { }}>保存</Button>
                </Space>
              </Form>
            </Drawer>
          </div>
          <AMarker {...aMarkerProps} />
          <LineLayer
            key="p2"
            source={{
              data: plist,
              parser: {
                type: 'json',
                coordinates: 'geometryCoord',
              },
            }}
            color={{
              values: ['#1a61DC'],
            }}
            size={{
              values: [2, 20],
            }}
          ></LineLayer>
        </AMapScene>
      </>
    );
  }
}

export default connect(
  ({
    pathMaintain2,
    loading,
  }: {
    pathMaintain2: ModalState;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    pathMaintain2,
    loading: loading.models.pathMaintain2,
  }),
)(Comp);
