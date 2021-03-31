import { connect, history } from 'umi';
import React, { Component } from 'react';
import type { ModalState } from '@/pages/eam/environment/model';
import { AMapScene } from '@antv/l7-react';
import AMarker from './AMarker';
import { Popover, Button, message } from 'antd';
import styles from './index.less';
import _ from 'lodash';
import { CloseCircleOutlined } from '@ant-design/icons';
import { getPathPages, Delete } from './service'

interface Props {
  pathMaintain: ModalState;
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
    roadlist: [], // 路径列表
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

    this.initlist()
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
            markerLng: [...self.state.markerLng, obj.lnglat],
            roadInfo: [...self.state.roadInfo, obj]
          })
        }
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

  initlist = async() => {
    const {code, msg, data} = await getPathPages({})
    if(code == 0) this.setState({roadlist: data?.records})
    else message.error(msg)
  }

  save = (values: any) => {
    console.log(values?.pathName, this.state.roadInfo);
  };

  deteleData = async(id: any) => {
    const {code, msg} = await Delete(id)
    if(code == 0) message.success('删除成功'), this.initlist()
    else message.error(msg)
  };

  render() {
    const self = this;
    const { dispatch } = this.props;
    const { aMarkerProps } = this;
    const { roadlist } = this.state;
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
              {roadlist.map((item: any) => (
                <li>
                  <Popover
                    content={() => (
                      <>
                        <Button
                          style={{ marginRight: '8px' }}
                          onClick={() => {
                            history.push({
                              pathname: `/patrol/list`,
                              query: { id: item?.patrolPath?.id },
                            });
                          }}
                        >
                          编辑
                        </Button>
                        <Button onClick={() => this.deteleData(item?.patrolPath?.id)}>删除</Button>
                      </>
                    )}
                    trigger="hover"
                  >
                    <Button block={true}>{item?.patrolPath?.inspPatrolPathName}</Button>
                  </Popover>
                </li>
              ))}
            </ul>
            <div style={{ margin: '16 0 0 16' }}>
              <Button
                type="primary"
                onClick={() => {
                  history.push({pathname: '/patrol/list'})
                }}
              >
                +创建路径
              </Button>
            </div>
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
