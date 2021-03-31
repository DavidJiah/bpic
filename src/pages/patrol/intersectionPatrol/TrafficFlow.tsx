import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Divider,
} from 'antd';
import Draw from '@/pages/eam/flow/components/canvas.js';
import { PARTOL_WAY } from '@/const';
import _ from 'lodash';

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 14 },
};

const defaultData: any[] = [
  {
    id: 1,
    entranceExitDirection: '北',
    uturnVolume: 0,
    leftTurnVolume: 0,
    straightVolume: 0,
    rightTurnVolume: 0,
  },
  {
    id: 2,
    entranceExitDirection: '南',
    uturnVolume: 0,
    leftTurnVolume: 0,
    straightVolume: 0,
    rightTurnVolume: 0,
  },
  {
    id: 3,
    entranceExitDirection: '东',
    uturnVolume: 0,
    leftTurnVolume: 0,
    straightVolume: 0,
    rightTurnVolume: 0,
  },
  {
    id: 4,
    entranceExitDirection: '西',
    uturnVolume: 0,
    leftTurnVolume: 0,
    straightVolume: 0,
    rightTurnVolume: 0,
  },
];

const TrafficFlow: React.FC<any> = React.forwardRef((props, ref) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [tableData, setTableData] = useState<any[]>(defaultData);
  const canvasbox = useRef(null);
  const [FLowForm] = Form.useForm();

  const getFlowData = async () => (
    FLowForm.validateFields().then(value => {
      return JSON.stringify({ tableData, formData: value })
    })
  )

  useImperativeHandle(ref, () => ({
    getFlowData,
  }));

  useEffect(() => {
    Draw({
      el: canvasbox.current,
      carVal: tableData,
      maxLineWidth: 30,
      thresholdVal: 500,
    });
  }, [tableData]);

  const columns: any = [
    {
      title: '方位',
      dataIndex: 'entranceExitDirection',
      key: 'entranceExitDirection',
      width: '20%',
    },
    {
      title: '掉头',
      dataIndex: 'uturnVolume',
      key: 'uturnVolume',
      valueType: 'digit',
      width: '20%',
    },
    {
      title: '左转',
      dataIndex: 'leftTurnVolume',
      key: 'leftTurnVolume',
      valueType: 'digit',
      width: '20%',
    },
    {
      title: '直行',
      dataIndex: 'straightVolume',
      key: 'straightVolume',
      valueType: 'digit',
      width: '20%',
    },
    {
      title: '右转',
      dataIndex: 'rightTurnVolume',
      key: 'rightTurnVolume',
      valueType: 'digit',
      width: '20%',
    },
  ];

  return (
    <>
      <Row gutter={[30, 0]}>
        <Col span={8}>
          <div
            ref={canvasbox}
            style={{
              width: '220px',
              height: '220px',
              background: '#141414',
              padding: '10px',
              boxSizing: 'content-box',
            }}
          />
        </Col>
        <Col span={16}>
          <EditableProTable<any>
            size="small"
            bordered={true}
            rowKey="id"
            maxLength={4}
            recordCreatorProps={false}
            columns={columns}
            request={async () => ({
              data: tableData,
              total: 4,
              success: true,
            })}
            editable={{
              type: 'multiple',
              editableKeys,
              onValuesChange: (record, recordList) => {
                setTableData(recordList);
              },
              onChange: setEditableRowKeys,
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Form form={FLowForm}>
        <Row>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="jtlltj_xjfs"
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
            <Form.Item {...layout} name="jtlltj_jl" label="结论" initialValue="流量正常">
              <Input placeholder="请输入结论" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
});

export default TrafficFlow
