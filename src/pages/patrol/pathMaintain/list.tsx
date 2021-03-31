import { connect } from 'umi';
import React, { Component } from 'react';
import type { ModalState } from '@/pages/eam/environment/model';
import { AMapScene, LineLayer } from '@antv/l7-react';
import AMarker from './AMarker';
import { Drawer, Button, Form, Input, Steps, Space, message } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { history } from 'umi';
import { creatPath, getPathById, updatePath } from './service'

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
  };

  formRef: any = React.createRef();

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

    this.initData()
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

  stepsTitle = (title: any) => {
    return (
      <div>
        <span style={{ marginRight: '10px' }}>{title}</span><CloseCircleOutlined />
      </div>
    )
  }

  initData = async () => {
    const { location: { query: { id } } } = this.props
    if (id) {
      const { code, msg, data } = await getPathById(id)
      if (code == 0) {
        const newdata = _.map(data?.patrolPathNodeList, (item: any) => ({
          title: item?.intIntersectionName,
          intersectionId: item?.intIntersectionId,
          lnglat: []
        }))
        this.setState({ markerLng: newdata, roadInfo: newdata })
        this.formRef?.current?.setFieldsValue({
          pathName: data?.patrolPath?.inspPatrolPathName
        })
      } else {
        message.error(msg)
      }
    }
  }

  savePathOrUpdate = async (values: any) => {
    console.log(values?.pathName, this.state.roadInfo)
    const { location: { query: { id } } } = this.props
    if (!id) {
      const { code, msg } = await creatPath({ pathName: values?.pathName, roadInfo: this.state.roadInfo })
      if (code == 0) message.success('创建成功'), history.goBack()
      else message.error(msg)
    } else {
      const { code, msg } = await updatePath(id, { pathName: values?.pathName, roadInfo: this.state.roadInfo })
      if (code == 0) message.success('更新成功'), history.goBack()
      else message.error(msg)
    }
  }

  Detele = (index: any) => {
    index === 0 ? this.state.roadInfo.shift() : this.state.roadInfo.pop()
    this.setState({ roadInfo: this.state.roadInfo })
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
        <Form ref={this.formRef} layout='vertical'  onFinish={(values) => { this.savePathOrUpdate(values) }} >
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
                <Form.Item label='路线名称' name='pathName' rules={[{ required: true }]}>
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
        </Form>
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
