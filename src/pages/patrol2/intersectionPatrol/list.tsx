import { connect } from 'umi';
import React, { Component } from 'react';
import type { ModalState } from '@/pages/eam/environment/model';
import { AMapScene } from '@antv/l7-react';
import AMarker from './AMarker';
import { Button, Drawer, message, Space } from 'antd';
import _ from 'lodash';
import { history } from 'umi';
import { creatData } from './service';

interface Props {
  pathMaintain2: ModalState;
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
      type: 'pathMaintain2/hideCard',
      payload: {
        cardVisible: false,
      },
    });
  }

  get aMarkerProps() {
    // let list = JSON.parse(sessionStorage?.getItem('list') || '');
    let list = [
      { intIntersectionId: '27', intIntersectionName: '龙洲路-关公路路口', intIntersectionLatitude: 112.3518449986, intIntersectionLongitude: 28.5600289346 },
      { intIntersectionId: '28', intIntersectionName: '龙洲路-桃花仓路路口', intIntersectionLatitude: 112.3508449986, intIntersectionLongitude: 28.5600289446 },
      { intIntersectionId: '29', intIntersectionName: '大桃路-滨江路路口', intIntersectionLatitude: 112.3501479542, intIntersectionLongitude: 28.5601257226 },
    ] // 假数据
    const self = this;
    const tlist: any = list || [];
    return {
      list: tlist?.map((e: any) => {
        return {
          id: e?.intIntersectionId,
          title: e?.intIntersectionName,
          lnglat: [
            e?.intIntersectionLatitude,
            e?.intIntersectionLongitude,
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

  save = async(id: any) => {
    console.log(this.state.roadInfo)
    const {code, msg} = await creatData(id, this.state.roadInfo)
    if(code == 0) message.success('保存成功')
    else message.error(msg)
  }

  render() {
    const self = this;
    const { dispatch, location: { query: { patrolScheduleId } } } = this.props;
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
                type: 'pathMaintain2/hideCard',
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
              <Space style={{ position: 'absolute', bottom: '20px' }}>
                <Button onClick={() => { history.goBack() }}>取消</Button>
                <Button type='primary' htmlType="submit" onClick={() => this.save(patrolScheduleId)}>保存</Button>
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
