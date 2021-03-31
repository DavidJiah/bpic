import React, { Component } from 'react'
import {Tabs, Modal } from 'antd'
import  './IntersectionModal.less'
import IntersectionTypeForm from './IntersectionTypeForm'
import IntersectionForm from './IntersectionForm'

const { TabPane } = Tabs;

class IntersectionModal extends Component<any> {
  state = {
    activeKey: '1', 
    id:''
  };

  intersectionRef: any = React.createRef();
  turnLaneRef: any = React.createRef();

  onSubmit=()=>{
    const {activeKey} = this.state
    if(activeKey==='1') this.intersectionRef.current.onSubmit()
    else this.turnLaneRef?.current?.onSubmit()
  }

  beforeSubmit=(_msg: any)=>{
    if(_msg.code===0){
      this.setState({id:_msg.data.id})
    }
  }

  render() {
    const { initialValues, disabled, type, ...modalProps } = this.props
    const { id } = this.state
    
    return (
      <Modal title='路口建档' {...modalProps} onOk={this.onSubmit.bind(this)} okButtonProps={{ disabled: disabled }}>
        <Tabs type='card' onChange ={ activeKey => {this.setState({ activeKey }); }}>
          <TabPane tab="路口基本信息" key="1">
            <IntersectionForm type={type} initialValues={initialValues} disabled={disabled} beforeSubmit={this.beforeSubmit}  ref={this.intersectionRef} />
          </TabPane>
          <TabPane tab="路口渠化图" key="2">
            <IntersectionTypeForm type={type} ref={this.turnLaneRef} initialValues={{id, intIntersectionId: initialValues?.intIntersectionId}} disabled={disabled} />
          </TabPane>
        </Tabs>
      </Modal>
    )
  }
}

export default IntersectionModal
