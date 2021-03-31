import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  Collapse,
  Card,
  Button,
  Space,
  Radio,
} from 'antd';
import style from './index.less';
import _, { indexOf } from 'lodash';
import moment from 'moment';
import BasicInformation from './BasicInformation';
import SignalLight from './SignalLight';
import TimePlanEditRable from './TimePlanEditTable';
import TrafficCondition from './TrafficCondition';
import TrafficFlow from './TrafficFlow';
import CoordinationControl from './CoordinationControl';

const { Panel } = Collapse;

const genExtra = (key: any, defaultValue: any, activeKey: any, setActiveKey: any) => {
  const [radioValue, setRadioValue] = useState(defaultValue);

  const onChange = (e: any) => {
    setRadioValue(e.target.value);
    if (e.target.value === '异常') {
      activeKey.push(key);
      setActiveKey(activeKey);
    } else {
      let index = activeKey.indexOf(key);
      activeKey.splice(index, 1);
      setActiveKey(activeKey);
    }
  };

  return (
    <Radio.Group onChange={onChange} defaultValue={radioValue}>
      <Radio value={'正常'}>正常</Radio>
      <Radio value={'异常'}>异常</Radio>
    </Radio.Group>
  );
};

const SubmitReport = ({ list }: any) => {
  const [activeKey, setActiveKey] = useState(['jbxx']);
  const [jbxx_form] = Form.useForm();
  const [xhdxj_form] = Form.useForm();
  const timePlanRef = useRef<any>(null);
  const ConditionRef = useRef<any>(null);
  const flowRef = useRef<any>(null);
  const controlRef = useRef<any>(null);

  useEffect(() => {
    setFormList();
  }, []);

  //  将带进来的参数赋值到表单中
  const setFormList = () => {
    jbxx_form?.setFieldsValue({
      jbxx_intercetionName: '康富路-桃花仑路路口',
      jbxx_zycd: '重要',
      jbxx_kzcl: '123',
      jbxx_xjr: '蒋良长',
      jbxx_xjrq: [moment('2021/01/01'), moment('2021/01/01')],
      jbxx_lxfs: '13312341234',
      jbxx_xjsd: [moment('07:00', 'HH:mm'), moment('09:00', 'HH:mm')],
      jbms: '123123123',
    });
  };

  /**
   * save[巡检报告保存按钮]
   * @param basicInformation  // 基本信息
   * @param signalLight  // 信号灯信息
   * @param timePlanEditRable  // 配时方案
   * @param ConditionData  // 交通运行状况
   * @param flowData  // 交通流量统计
   * @param controlData  // 系统控制
   */
  const save = async () => {
    let basicInformation = undefined // 基本信息
    let signalLight = undefined // 信号灯信息
    let timePlanEditRable = undefined // 配时方案
    let ConditionData = undefined // 交通运行状况
    let flowData = undefined // 交通流量统计
    let controlData = undefined // 系统控制

    // 获取下来之后的数据
    await Promise.all(_.map(activeKey, async (item: any) => {
      if (item == 'jbxx') basicInformation = await jbxx_form?.validateFields().then(basicInformationData => basicInformationData)
      else if (item == 'xhdxj') signalLight = await xhdxj_form?.validateFields().then(signalLightData => signalLightData)
      else if (item == 'psfa') timePlanEditRable = await timePlanRef.current?.getTimePlanData()
      else if (item == 'jtyxzk') ConditionData = await ConditionRef.current?.getConditionData()
      else if (item == 'jtlltj') flowData = await flowRef.current?.getFlowData()
      else if (item == 'xtkz') controlData = await controlRef.current?.getControlData()
    }))

    //api
    console.log(basicInformation, signalLight, timePlanEditRable, ConditionData, flowData, controlData)
  };

  return (
    <>
      <Card bordered={false} className={style.submitReport}>
        <h2>益阳市城市交通信号管理及优化服务项目巡检报告</h2>
        <Collapse activeKey={activeKey} collapsible={'disabled'}>
          <Panel header="1、基本信息" key="jbxx" collapsible={'header'}>
            <BasicInformation formName={jbxx_form} />
          </Panel>
          <Panel
            header="2、信号灯巡检"
            key="xhdxj"
            extra={genExtra('xhdxj', '正常', activeKey, setActiveKey)}
          >
            <SignalLight formName={xhdxj_form} />
          </Panel>
          <Panel
            header="3、配时方案"
            key="psfa"
            extra={genExtra('psfa', '正常', activeKey, setActiveKey)}
          >
            <TimePlanEditRable ref={timePlanRef} />
          </Panel>
          <Panel
            header="4、交通运行状况"
            key="jtyxzk"
            extra={genExtra('jtyxzk', '正常', activeKey, setActiveKey)}
          >
            <TrafficCondition ref={ConditionRef} />
          </Panel>
          <Panel
            header="5、交通流量统计（选填）"
            key="jtlltj"
            extra={genExtra('jtlltj', '正常', activeKey, setActiveKey)}
          >
            <TrafficFlow ref={flowRef} />
          </Panel>
          <Panel
            header="6、协调控制（选填）"
            key="xtkz"
            extra={genExtra('xtkz', '正常', activeKey, setActiveKey)}
          >
            <CoordinationControl ref={controlRef} />
          </Panel>
        </Collapse>
        <Space className={style.butSpace}>
          <Button onClick={() => { }}>返回</Button>
          <Button
            type="primary"
            onClick={() => {
              save();
            }}
          >
            保存
          </Button>
          <Button type="primary" onClick={() => { }}>
            下载
          </Button>
        </Space>
      </Card>
    </>
  );
};

export default SubmitReport;
