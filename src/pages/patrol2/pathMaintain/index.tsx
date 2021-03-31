import { connect } from 'umi';
import React, { Component } from 'react';
import type { ModalState } from '@/pages/eam/environment/model';
import { AMapScene } from '@antv/l7-react';
import AMarker from './AMarker';
import { Popover, Button, Drawer, Form, Input, Steps, Space } from 'antd';
import styles from './index.less';
import _ from 'lodash';
import { history } from 'umi';

interface Props {
  pathMaintain: ModalState;
  dispatch: any;
  loading: boolean;
  list: any[];
}

const data = [
  {pathName: '路径一'},
  {pathName: '路径二'},
  {pathName: '路径三'}
]
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
        self.setState({
          markerLng: [...self.state.markerLng, obj.lnglat],
          roadInfo: [...self.state.roadInfo, obj],
        });
      },
    };
  }

  stepsTitle = (title: any, index: number) => {
    return (
      <div>
        <span style={{ marginRight: '10px' }}>{title}</span>
        {(index == 0 || index == this.state?.roadInfo?.length - 1) && <CloseCircleOutlined />}
      </div>
    );
  };

  save = (values: any) => {
    console.log(values?.pathName, this.state.roadInfo);
  };

  Detele = (index: any) => {
    if (index != 0 && index != this.state.roadInfo.length - 1) return;
    index === 0 ? this.state.roadInfo.shift() : this.state.roadInfo.pop();
    index === 0 ? this.state.markerLng.shift() : this.state.markerLng.pop();
    this.setState({ roadInfo: this.state.roadInfo, markerLng: this.state.markerLng });
  };

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
                type: 'pathMaintain/hideCard',
                payload: {
                  cardVisible: true,
                },
              });
            });
          }}
        >
          <div className={styles.mask}>
            <ul>
              {data.map((item: any) => (
              <li>
                <Popover
                 content={() => (
                  <>
                    <Button style={{marginRight: '8px'}} onClick={() => {history.push({ pathname: `/patrol/pathMaintain`, query: { id: item?.id } })}}>编辑</Button>
                    <Button onClick={() => {}}>删除</Button>
                  </>
                 )}
                 trigger="hover"
                >
                  <Button block={true}>{item?.pathName}</Button>
                </Popover>
              </li>))}
            </ul>
            <div style={{ margin: '16 0 0 16' }}>
              <Button
                type="primary"
                onClick={() => {
                  this.setState({ visible: true });
                }}
              >
                +创建路径
              </Button>
            </div>
            <Drawer
              title="创建路线"
              placement="left"
              closable={false}
              mask={false}
              zIndex={1}
              onClose={() => {
                this.setState({ visible: false });
              }}
              visible={this.state.visible}
              getContainer={false}
              style={{ position: 'absolute', width: '16%' }}
            >
              <Form
                layout="vertical"
                onFinish={(values) => {
                  this.save(values);
                }}
              >
                <Form.Item label="路线名称" name="pathName">
                  <Input placeholder="请输入路线名称" />
                </Form.Item>
                <Form.Item name="intersectionList" label="选择的路口">
                  <Steps
                    progressDot
                    current={21}
                    direction="vertical"
                    size="small"
                    onChange={(current) => {
                      this.Detele(current);
                    }}
                  >
                    {roadInfo?.map((item: any, index: any) => (
                      <Steps.Step title={this.stepsTitle(item?.title, index)} status={'finish'} />
                    ))}
                  </Steps>
                </Form.Item>
                <Space>
                  <Button>取消</Button>
                  <Button type="primary" htmlType="submit" onClick={() => {}}>
                    保存
                  </Button>
                </Space>
              </Form>
            </Drawer>
          </div>
          <AMarker {...aMarkerProps} />
          {/* <LineLayer
            key="p2"
            source={{
              data: [],
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
          ></LineLayer> */}
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
