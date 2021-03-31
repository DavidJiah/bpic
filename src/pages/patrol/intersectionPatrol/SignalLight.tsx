import React from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Select
} from 'antd';
import { PARTOL_WAY, EQUIPMENT_STATUS } from '@/const';
import GlobalUpload from '@/components/GlobalUpload';
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
            <Form.Item
              {...layout}
              name="xhdxj_xjfs"
              label="巡检方式"
              rules={[{ required: true, message: '请选择巡检方式!' }]}
            >
              <Select placeholder="请选择巡检方式">
                {_.map(PARTOL_WAY, (item: any) => (
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
              name="xhdxj_jdczt"
              label="机动车灯状态"
              rules={[{ required: true, message: '请选择机动车灯状态!' }]}
            >
              <Select placeholder="请选择机动车灯状态">
                {_.map(EQUIPMENT_STATUS, (item: any) => (
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
              name="xhdxj_fjdczt"
              label="非机动车状态"
              rules={[{ required: true, message: '请选择非机动车状态!' }]}
            >
              <Select placeholder="请选择非机动车状态">
                {_.map(EQUIPMENT_STATUS, (item: any) => (
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
              name="xhdxj_xrdzt"
              label="行人灯状态"
              rules={[{ required: true, message: '请选择行人灯状态!' }]}
            >
              <Select placeholder="请选择行人灯状态">
                {_.map(EQUIPMENT_STATUS, (item: any) => (
                  <Select.Option key={item?.key} value={item?.value}>
                    {item?.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item {...layout} name="xhdxj_bz" label="备注">
              <Input placeholder="请输入备注" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="xhdxj_jdcgzyy"
              label="机动车灯故障原因"
              rules={[{ required: true, message: '请输入机动车灯故障原因!' }]}
            >
              <Input placeholder="请输入机动车灯故障原因" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="xhdxj_fjdcgzyy"
              label="非机动车故障原因"
              rules={[{ required: true, message: '请输入非机动车故障原因!' }]}
            >
              <Input placeholder="请输入非机动车故障原因" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="xhdxj_xrdgzyy"
              label="行人灯故障原因"
              rules={[{ required: true, message: '请输入行人灯故障原因!' }]}
            >
              <Input placeholder="请输入行人灯故障原因" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item {...layout} name="xhdxj_jl" label="结论" initialValue="路口信号灯运行正常。">
              <Input placeholder="请输入结论" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item {...layout} name="xhdxj_sctp" label="上传图片">
              <GlobalUpload
                imgUrl={''}
                initialValues={{ businessType: '信号灯巡检', id: '20' }}
                onChange={(e: any) => {
                  console.log(e);
                }}
                type="big"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
