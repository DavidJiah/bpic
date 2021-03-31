/*
 * @Author: Dad
 * @Date: 2021-03-10 16:35:45
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-15 16:51:58
 */
import React from 'react';
import { Row, Col, Form } from 'antd';
import { PhasescImg } from '@/components/graphic';
import {
    ModalForm,
    ProFormText,
    ProFormTextArea,
    ProFormDigit
} from '@ant-design/pro-form';
import './phase.less'

// 转换流向序号和流向描述
const flowDirectionDescriptionMap = {
  '1': '南左',
  '2': '北直',
  '3': '西左',
  '4': '东直',
  '5': '北左',
  '6': '南直',
  '7': '东左',
  '8': '西直',
  '9': '东南左',
  '10': '西北左',
  '11': '西南左',
  '12': '东北直',
  '13': '西北直',
  '14': '东南直',
  '15': '东北左',
  '16': '西南直',
};
// 将流向序号映射成流向描述
const convertDirectionNumberDescription = ( directionNumber: string) => {
  if(!directionNumber){
    return '';
  }
  return directionNumber.split(',').map(value=>{
    if(flowDirectionDescriptionMap[value]){
      return flowDirectionDescriptionMap[value];
    }
    return value
  }).toString();
};

const PhaseModel: React.FC<any> = (props) => {
  const { phasescs, onAdd, uid, editPhase, setEdit } = props;
  const [form] = Form.useForm();
  // 监听流向图数据变化
  const onImageChange = (imgUid: any, status: any) => {
    form.setFieldsValue({
      scDirectionNumber: status,
      scDirectionDescription: convertDirectionNumberDescription(status),
    });
  };
  const initData: any = { ...editPhase };
  if (!initData.scPhaseNumber) {
    // 初始化相位序号
    initData.scPhaseNumber = phasescs?.length + 1;
  }

  // 弹窗打开的时候刷新表单数据 弹窗关闭的时候清理编辑中的临时数据
  const onVisibleChange = (v: boolean)=>{
    if(v){
      form.resetFields();
    }else{
      setEdit(false);
    }
  };

  return (
    <ModalForm
      title="维护相位流向-基准方向[北]"
      width="780px"
      visible={!!editPhase}
      name="add-phasesc-form"
      onFinish={async (values: any) => {
        if(onAdd){
          onAdd({ ...editPhase, ...values });
        }
        return true;
      }}
      onVisibleChange={onVisibleChange}
      form={form}
    >
      <Row>
        <Col span={14}>
          <PhasescImg
            uid={uid}
            key={uid}
            size={12}
            editable={true}
            state={initData.scDirectionNumber}
            onChange={onImageChange}
          ></PhasescImg>
        </Col>
        <Col span={10}>
          <ProFormDigit
            initialValue={initData.scPhaseNumber}
            disabled={true}
            name="scPhaseNumber"
            rules={[{ required: true, message: '请输入相位序号!' }]}
            label="相位序号"
          />
          <ProFormText
            name="scPhaseDescription"
            initialValue={initData.scPhaseDescription}
            label="相位描述"
            rules={[{ required: true, message: '请输入相位描述!' }]}
          />
          <ProFormText
            name="scDirectionNumber"
            initialValue={initData.scDirectionNumber}
            label="流向序号"
            disabled={true}
            rules={[{ required: true, message: '请输入流向序号!' }]}
          />
          <ProFormTextArea
            name="scDirectionDescription"
            initialValue={initData.scDirectionDescription}
            label="流向描述"
            disabled={true}
            rules={[{ required: true, message: '请输入流向描述!' }]}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <ProFormDigit initialValue={initData.scGreenTime} name="scGreenTime" label="绿灯时间" />
        </Col>
        <Col span={6}>
          <ProFormDigit
            initialValue={initData.scMinimumGreenTime}
            name="scMinimumGreenTime"
            label="最短绿灯"
          />
        </Col>
        <Col span={6}>
          <ProFormDigit
            initialValue={initData.scMaximumGreenTime}
            name="scMaximumGreenTime"
            label="最长绿灯"
          />
        </Col>
        <Col span={6}>
          <ProFormDigit initialValue={initData.scYellowTime} name="scYellowTime" label="黄灯时间" />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <ProFormDigit initialValue={initData.scAllRedTime} name="scAllRedTime" label="全红时间" />
        </Col>
        <Col span={6}>
          <ProFormDigit
            initialValue={initData.scFlashingGreenTime}
            name="scFlashingGreenTime"
            label="绿闪时间"
          />
        </Col>
        <Col span={6}>
          <ProFormDigit
            initialValue={initData.scPedestrianRedTime}
            name="scPedestrianRedTime"
            label="行人红灯"
          />
        </Col>
        <Col span={6}>
          <ProFormDigit
            initialValue={initData.scPedestrianBlinkingTime}
            name="scPedestrianBlinkingTime"
            label="行闪时间"
          />
        </Col>
      </Row>
    </ModalForm>
  );
};

export default PhaseModel;
