import React from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select
} from 'antd';
import { WEATHER_LIST } from '@/const';
import _ from 'lodash';

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 14 },
};

export default (props: any) => {
  return (
    <>
      <Form form={props?.formName}>
        <Row>
          <Col span={6}>
            <Form.Item {...layout} name="jbxx_intercetionName" label="路口名称">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="jbxx_zycd"
              label="重要程度"
              rules={[{ required: true, message: '请输入重要程度!' }]}
            >
              <Input placeholder="请输入重要程度" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="jbxx_kzcl"
              label="控制策略"
              rules={[{ required: true, message: '请输入控制策略!' }]}
            >
              <Input placeholder="请输入控制策略" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item {...layout} name="jbxx_xjr" label="巡检人">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="jbxx_xjrq"
              label="巡检日期"
              rules={[{ required: true, message: '请选择巡检日期!' }]}
            >
              <DatePicker.RangePicker disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="jbxx_weather"
              label="天气"
              rules={[{ required: true, message: '请选择天气!' }]}
            >
              <Select>
                {_.map(WEATHER_LIST, (item: any) => (
                  <Select.Option key={item?.key} value={item?.value}>
                    {item?.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="jbxx_lxfs"
              label="联系方式"
              rules={[{ required: true, message: '请输入联系方式!' }]}
            >
              <Input placeholder="请输入联系方式" defaultValue="12345679810" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="jbxx_xjsd"
              label="巡检时段"
              rules={[{ required: true, message: '请选择巡检时段!' }]}
            >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              name="jbms"
              label="基本描述"
            >
              <Input.TextArea
                rows={3}
                showCount
                maxLength={200}
                placeholder="请输入不超过200字的描述"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
