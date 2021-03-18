import { connect } from 'umi';
import React, { Component } from 'react';
import type { ModalState } from './model';
import { Col, Row } from 'antd';
import { AMapScene } from '@antv/l7-react';
import styles from './style.less';
import AMarker  from './components/AMarker'; 
import RoadModal from './components/RoadModal';
import BottomCard from './components/BottomCards';

interface Props {
  environment: ModalState;
  dispatch: any;
  loading: boolean;
  list: any[];
}

class Environment extends Component<Props> {
  state = {
    markerLnglat: []
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'environment/hideCard',
      payload: {
        cardVisible: false
      }
    })
    dispatch({
      type: 'environment/fetch',
      payload: {
        count: 5,
      },
    }); 
  }


  get roadModalProps() {
    const { dispatch, environment } = this.props
    const { currentItem, modalVisible, modalType,initialValues } = environment
    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      initialValues,
      destroyOnClose: true,
      maskClosable: false,
      width: 630,
      title: '路口建档',
      centered: true,
      onOk(data){
        dispatch({
          type: `environment/hideRoadModal`,
          payload: data,
        }).then(() => {
        })
      },
      onCancel() {
        dispatch({
          type: 'environment/hideRoadModal',
        })
      },
    }
  }

  get aMarkerProps() {
    const { dispatch,environment } = this.props
    const {list}=environment 
    const tlist = list||[]
    return {
      list: tlist.map((e: any)=>{return { id: e.intIntersection.id, title: e.intIntersection.intIntersectionName, lnglat: [e.intIntersection.intIntersectionLatitude, e.intIntersection.intIntersectionLongitude] }}),
      onDetail(obj: any){ 
        dispatch({
          type: 'environment/showCard',
          payload: {
            title: obj.title,
            intersectionId: obj.intersectionId
          },
        })
      },
      onAdd(obj: any) {
        dispatch({
          type: 'environment/showRoadModal',
          payload: {
            modalType: 'create',
            initialValues:obj
          },
        })
      }
    }
  }

  get bottomCardProps() {
    const { dispatch,environment } = this.props  
    return {
      title: environment.cardData.title,
      intersectionId: environment.cardData.intersectionId,
      list:environment.cardData.list||[],
      visible:environment.cardVisible,
      onClose() {
        dispatch({
          type: 'environment/hideCard',
        })
      },
      onDelete(intersectionId: string, id: string){
        dispatch({
          type: 'environment/delete',
          payload: { 
            intersectionId,
            id
          },
        })
      },
      onEdit(obj: any){
        dispatch({
          type: 'environment/showRoadModal',
          payload: {
            modalType: 'create',
            initialValues:obj
          },
        })
      }
    }
  }

  render() {
    const self = this
    const { dispatch, environment} = this.props 
    const { aMarkerProps, roadModalProps,bottomCardProps } = this
    const {cardVisible,modalVisible} =environment
    return (
      <Row gutter={24} style={{ margin: 0, padding: 0 }}>
        <Col span={24} style={{ margin: 0, padding: 0 }} className={styles.amap}>
          <AMapScene
            map={{
              resizeEnable: true,
              center: [112.36229441821575, 28.56552675407389],
              pitch: 45,
              style: 'dark',
              zoom: 16,
              plugin: ['AMap.ElasticMarker', 'AMap.Weather']
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
            onSceneLoaded={({ map }) => {
              map.on('dblclick', (msg: any) => {
                self.setState({ markerLnglat: [msg.lnglat.R, msg.lnglat.Q] })
              });
              map.on('click', () => {
                dispatch({
                  type: 'environment/hideCard',
                  payload: {
                    cardVisible: true
                  },
                })
              });
            }
            }
          >
            <AMarker {...aMarkerProps} />
          </AMapScene>
          {modalVisible&&<RoadModal {...roadModalProps} />}
          {cardVisible&&<BottomCard {...bottomCardProps}/>}
        </Col>
      </Row>
    );
  }
}

export default connect(
  ({
    environment,
    loading,
  }: {
    environment: ModalState;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    environment,
    loading: loading.models.environment,
  }),
)(Environment);
