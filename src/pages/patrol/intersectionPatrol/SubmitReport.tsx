import React, { useState } from 'react';
import { Row, Col, Form, Input, DatePicker, TimePicker, Select, Collapse, Card, Button, Space, Radio, Divider } from 'antd';
import style from './index.less';
import _ from 'lodash'
import moment from 'moment'
import { WEATHER_LIST, PARTOL_WAY, EQUIPMENT_STATUS } from '@/const';
import GlobalUpload from '@/components/GlobalUpload';
import TimePlanEditRable from './TimePlanEditTable'
import TrafficCondition from './TrafficCondition'
import TrafficFlow from './TrafficFlow'

const { Panel } = Collapse;

const genExtra = (key: any, defaultValue: any, activeKey: any, setActiveKey: any) => {
  const [radioValue, setRadioValue] = useState(defaultValue)

  const onChange = (e: any) => {
    setRadioValue(e.target.value);
    if (e.target.value === '异常') {
      activeKey.push(key)
      setActiveKey(activeKey)
    } else {
      let index = activeKey.indexOf(key)
      activeKey.splice(index, 1)
      setActiveKey(activeKey)
    }
  };

  return (
    <Radio.Group onChange={onChange} defaultValue={radioValue}>
      <Radio value={'正常'}>正常</Radio>
      <Radio value={'异常'}>异常</Radio>
    </Radio.Group>
  )
}

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 14 },
};

const SubmitReport = (props: any) => {
  const [activeKey, setActiveKey] = useState(['jbxx']);
  const [form] = Form.useForm()

  const save = () => {
    const param = form?.getFieldsValue();
    console.log(param)
  }

  return (
    <>
      <Card bordered={false} className={style.submitReport}>
        <h2>益阳市城市交通信号管理及优化服务项目巡检报告</h2>
        <Form form={form}>
          <Collapse
            activeKey={activeKey}
            collapsible={'disabled'}
          >
            <Panel header="1、基本信息" key="jbxx" collapsible={'header'}>
              <Row>
                <Col span={6}>
                  <Form.Item {...layout} name="jbxx_intercetionName" label='路口名称' rules={[{ required: true, message: '请输入路口名称!' }]}>
                    <Input placeholder='请输入路口名称' defaultValue='康富路-桃花仑路路口' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="jbxx_zycd" label='重要程度' rules={[{ required: true, message: '请输入重要程度!' }]}>
                    <Input placeholder='请输入重要程度' defaultValue='重要' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="jbxx_kzcl" label='控制策略' rules={[{ required: true, message: '请输入控制策略!' }]}>
                    <Input placeholder='请输入控制策略' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="jbxx_xjr" label='巡检人' rules={[{ required: true, message: '请输入巡检人!' }]}>
                    <Input placeholder='请输入巡检人' defaultValue='蒋良长' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="jbxx_xjrq" label='巡检日期' rules={[{ required: true, message: '请选择巡检日期!' }]}>
                    <DatePicker.RangePicker defaultValue={[moment('2021/01/01'), moment('2021/01/01')]} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="jbxx_weather" label='天气' rules={[{ required: true, message: '请选择天气!' }]}>
                    <Select>
                      {_.map(WEATHER_LIST, (item: any,) => (
                        <Select.Option key={item?.key} value={item?.value}>
                          {item?.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="jbxx_lxfs" label='联系方式' rules={[{ required: true, message: '请输入联系方式!' }]}>
                    <Input placeholder='请输入联系方式' defaultValue='12345679810' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="jbxx_xjsd" label='巡检时段' rules={[{ required: true, message: '请选择巡检时段!' }]}>
                    <TimePicker.RangePicker format='HH:mm' defaultValue={[moment('07:00', 'HH:mm'), moment('09:00', 'HH:mm')]} />
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} name="jbms" label='基本描述' rules={[{ required: true, message: '请输入不超过200字的描述!' }]}>
                    <Input.TextArea rows={3} showCount maxLength={200} placeholder='请输入不超过200字的描述' />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
            <Panel header="2、信号灯巡检" key="xhdxj" extra={genExtra('xhdxj', '正常', activeKey, setActiveKey)}>
              <Row>
                <Col span={6}>
                  <Form.Item {...layout} name="xhdxj_xjfs" label='巡检方式' rules={[{ required: true, message: '请选择巡检方式!' }]}>
                    <Select defaultValue='现场' placeholder='请选择巡检方式'>
                      {_.map(PARTOL_WAY, (item: any,) => (
                        <Select.Option key={item?.key} value={item?.value}>
                          {item?.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="xhdxj_jdczt" label='机动车灯状态' rules={[{ required: true, message: '请选择机动车灯状态!' }]}>
                    <Select defaultValue='正常' placeholder='请选择机动车灯状态'>
                      {_.map(EQUIPMENT_STATUS, (item: any,) => (
                        <Select.Option key={item?.key} value={item?.value}>
                          {item?.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="xhdxj_fjdczt" label='非机动车状态' rules={[{ required: true, message: '请选择非机动车状态!' }]}>
                    <Select defaultValue='正常' placeholder='请选择非机动车状态'>
                      {_.map(EQUIPMENT_STATUS, (item: any,) => (
                        <Select.Option key={item?.key} value={item?.value}>
                          {item?.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="xhdxj_xrdzt" label='行人灯状态' rules={[{ required: true, message: '请选择行人灯状态!' }]}>
                    <Select defaultValue='正常' placeholder='请选择行人灯状态'>
                      {_.map(EQUIPMENT_STATUS, (item: any,) => (
                        <Select.Option key={item?.key} value={item?.value}>
                          {item?.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="xhdxj_bz" label='备注'>
                    <Input placeholder='请输入备注' defaultValue='路口信号灯运行正常。' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="xhdxj_jdcgzyy" label='机动车灯故障原因' rules={[{ required: true, message: '请输入机动车灯故障原因!' }]}>
                    <Input placeholder='请输入机动车灯故障原因' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="xhdxj_fjdcgzyy" label='非机动车故障原因' rules={[{ required: true, message: '请输入非机动车故障原因!' }]}>
                    <Input placeholder='请输入非机动车故障原因' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="xhdxj_xrdgzyy" label='行人灯故障原因' rules={[{ required: true, message: '请输入行人灯故障原因!' }]}>
                    <Input placeholder='请输入行人灯故障原因' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="xhdxj_jl" label='结论'>
                    <Input placeholder='请输入结论' defaultValue='路口信号灯运行正常。' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="xhdxj_sctp" label='上传图片'>
                    <GlobalUpload
                      imgUrl={''}
                      initialValues={{ businessType: '信号灯巡检', id: '20' }}
                      onChange={(e: any) => { console.log(e) }}
                      type="big"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
            <Panel header="3、配时方案" key="psfa" extra={genExtra('psfa', '正常', activeKey, setActiveKey)}>
              <TimePlanEditRable />
              <Divider />
              <Row>
                <Col span={6}>
                  <Form.Item {...layout} name="psfa_xjfs" label='巡检方式' rules={[{ required: true, message: '请选择巡检方式!' }]}>
                    <Select defaultValue='现场' placeholder='请选择巡检方式'>
                      {_.map(PARTOL_WAY, (item: any,) => (
                        <Select.Option key={item?.key} value={item?.value}>
                          {item?.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="psfa_state" label='方案状态' rules={[{ required: true, message: '请选择方案状态!' }]}>
                    <Select defaultValue='正常'>
                      {_.map(EQUIPMENT_STATUS, (item: any,) => (
                        <Select.Option key={item?.key} value={item?.value}>
                          {item?.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="psfa_gzyy" label='故障原因' rules={[{ required: true, message: '请输入故障原因!' }]}>
                    <Input placeholder='请输入故障原因' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="psfa_gzxx" label='故障信息' rules={[{ required: true, message: '请输入故障信息!' }]}>
                    <Input placeholder='请输入故障信息' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="psfa_gzxcsj" label='故障消除时间' rules={[{ required: true, message: '请故障消除时间!' }]}>
                    <DatePicker showTime defaultValue={moment(new Date())} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="psfa_jl" label='结论'>
                    <Input placeholder='请输入结论' defaultValue='配时方案运行正常。' />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
            <Panel header="4、交通运行状况" key="jtyxzk" extra={genExtra('jtyxzk', '正常', activeKey, setActiveKey)}>
              <TrafficCondition />
              <Divider />
              <Row>
                <Col span={6}>
                  <Form.Item {...layout} name="jtyxzk_xjfs" label='巡检方式' rules={[{ required: true, message: '请选择巡检方式!' }]}>
                    <Select defaultValue='现场' placeholder='请选择巡检方式'>
                      {_.map(PARTOL_WAY, (item: any,) => (
                        <Select.Option key={item?.key} value={item?.value}>
                          {item?.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="jtyxzk_jl" label='结论'>
                    <Input placeholder='请输入结论' defaultValue='配时方案运行正常。服务等级为C级别。' />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
            <Panel header="5、交通流量统计（选填）" key="jtlltj" extra={genExtra('jtlltj', '正常', activeKey, setActiveKey)}>
              <TrafficFlow />
              <Divider />
              <Row>
                <Col span={6}>
                  <Form.Item {...layout} name="jtlltj_xjfs" label='巡检方式' rules={[{ required: true, message: '请选择巡检方式!' }]}>
                    <Select defaultValue='现场' placeholder='请选择巡检方式'>
                      {_.map(PARTOL_WAY, (item: any,) => (
                        <Select.Option key={item?.key} value={item?.value}>
                          {item?.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...layout} name="jtlltj_jl" label='结论'>
                    <Input placeholder='请输入结论' defaultValue='流量正常。' />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Form>
        <Space className={style.butSpace}>
          <Button onClick={() => { }}>返回</Button>
          <Button type="primary" onClick={() => { save() }}>保存</Button>
          <Button type="primary" onClick={() => { }}>下载</Button>
        </Space>
      </Card>
    </>
  );
}

export default SubmitReport;