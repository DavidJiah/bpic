import React, { useState, useImperativeHandle } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Divider,
  DatePicker,
} from 'antd';
import { POSITION_ALL, PARTOL_WAY, EQUIPMENT_STATUS } from '@/const';
import _ from 'lodash';

const defaultData = [
  {
    id: 1,
    timeRange: '6:00-7:00',
    scControlPlanCode: '一',
    scOffset: 54,
    scCycleTime: 130,
  },
];

const childrenData = [
  {
    id: 1,
    scAllRedTime: 1,
    scCoordinateDirection: '2',
    scDirectionCode: 2,
    scFlashingGreenTime: 3,
    scGreenTime: 4,
    scOffset: 5,
    scPhaseNumber: 6,
    scYellowTime: 7,
  },
];

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 14 },
};

const TimePlanEditTable: React.FC<any> = React.forwardRef(({ callBack }, ref) => {
  useImperativeHandle(ref, () => ({
    getTimePlanData,
  }));
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [childrenEditableKeys, setchildrenEditableKeys] = useState<React.Key[]>(() =>
    childrenData.map((item) => item.id),
  );
  const [tableData, setTableData] = useState<any[]>(() => defaultData);

  const childrenColumns: any = [
    { title: '相序代号', dataIndex: 'scDirectionCode', valueType: 'digit' },
    {
      title: '相位序号',
      dataIndex: 'scPhaseNumber',
      valueType: 'digit',
      width: 80,
      editable: true,
    },
    { title: '绿灯时间', dataIndex: 'scGreenTime', valueType: 'digit' },
    { title: '黄灯时间', dataIndex: 'scYellowTime', valueType: 'digit' },
    { title: '全红时间', dataIndex: 'scAllRedTime', valueType: 'digit' },
    { title: '绿闪时间', dataIndex: 'scFlashingGreenTime', valueType: 'digit' },
    {
      title: '人行方向',
      dataIndex: 'pedestrian',
      key: 'pedestrian',
      valueType: 'select',
      width: 120,
      valueEnum: POSITION_ALL,
    },
    {
      title: '基准方向',
      dataIndex: 'scCoordinateDirection',
      key: 'scCoordinateDirection',
      valueType: 'select',
      valueEnum: POSITION_ALL,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (_: any, row: any, index: number, action: any) => [],
    },
  ];
  const columns: any = [
    {
      title: '时间段',
      dataIndex: 'timeRange',
      key: 'timeRange',
      valueType: 'text',
    },
    {
      title: '方案编号',
      dataIndex: 'scControlPlanCode',
      key: 'scControlPlanCode',
      valueType: 'text',
    },
    {
      title: '相位差',
      dataIndex: 'scOffset',
      key: 'scOffset',
      valueType: 'digit',
    },
    {
      title: '总周期',
      dataIndex: 'scCycleTime',
      key: 'scCycleTime',
      valueType: 'digit',
    },
  ];

  const [timePlanForm] = Form.useForm();

  const getTimePlanData = async () => (
    timePlanForm.validateFields().then(value => {
      return JSON.stringify({ tableData, formData: value })
    })
  )

  const expandedRowRender = (props: any) => {
    const setdata = (value: any) => {
      tableData.map((item: any) => item.id === props?.id && (item.childrenData = value));
      setTableData(tableData);
    };

    return (
      <EditableProTable
        columns={childrenColumns}
        rowKey="id"
        value={props?.childrenData}
        onChange={setdata}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        maxLength={20}
        editable={{
          type: 'multiple',
          editableKeys: childrenEditableKeys,
          onDelete: async (key, row) => {
            props?.childrenData.splice(row?.index, 1);
            setdata(props?.childrenData);
            return true;
          },
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setdata(recordList);
          },
          onChange: setchildrenEditableKeys,
        }}
      />
    );
  };

  return (
    <>
      <EditableProTable<any>
        columns={columns}
        rowKey="id"
        value={tableData}
        onChange={(val: any) => {
          callBack(val);
          setTableData(val);
        }}
        recordCreatorProps={false}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: [1],
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onValuesChange: (record, recordList) => {
            setTableData(recordList);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <Divider />
      <Form form={timePlanForm}>
        <Row>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="psfa_xjfs"
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
              name="psfa_state"
              label="方案状态"
              rules={[{ required: true, message: '请选择方案状态!' }]}
            >
              <Select>
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
              name="psfa_gzyy"
              label="故障原因"
              rules={[{ required: true, message: '请输入故障原因!' }]}
            >
              <Input placeholder="请输入故障原因" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="psfa_gzxx"
              label="故障信息"
              rules={[{ required: true, message: '请输入故障信息!' }]}
            >
              <Input placeholder="请输入故障信息" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="psfa_gzxcsj"
              label="故障消除时间"
              rules={[{ required: true, message: '请故障消除时间!' }]}
            >
              <DatePicker showTime />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item {...layout} name="psfa_jl" label="结论" initialValue="配时方案运行正常。">
              <Input placeholder="请输入结论" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
});

export default TimePlanEditTable
