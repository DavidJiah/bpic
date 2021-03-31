import React, { useImperativeHandle, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Divider,
} from 'antd';
import moment from 'moment';
import { PARTOL_WAY } from '@/const';
import _ from 'lodash';

const defaultData = [
  {
    id: 1,
    flowDirection: '北左',
    scGreenTime: 5,
    describe: '0次排队',
    childrenData: [
      {
        id: 1,
        GreenStopTime: moment(new Date()),
        pass: '2',
        queueUp: 2,
      },
    ],
  },
  {
    id: 2,
    flowDirection: '北直',
    scGreenTime: 5,
    describe: '',
  },
  {
    id: 3,
    flowDirection: '南左',
    scGreenTime: 5,
    describe: '',
  },
  {
    id: 4,
    flowDirection: '南直',
    scGreenTime: 5,
    describe: '',
  },
  {
    id: 5,
    flowDirection: '东左',
    scGreenTime: 5,
    describe: '',
  },
  {
    id: 6,
    flowDirection: '东直',
    scGreenTime: 5,
    describe: '',
  },
  {
    id: 7,
    flowDirection: '西左',
    scGreenTime: 5,
    describe: '',
  },
  {
    id: 8,
    flowDirection: '西直',
    scGreenTime: 5,
    describe: '',
  },
];

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 14 },
};

const TrafficCondition: React.FC<any> = React.forwardRef(({ callBack }, ref) => {
  useImperativeHandle(ref, () => ({
    getConditionData,
  }));

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [childrenEditableKeys, setchildrenEditableKeys] = useState<React.Key[]>(() => {
    let arr: any = [];
    defaultData?.map((item: any) => {
      item.childrenData?.map((item2: any) => {
        arr.push(item2?.id);
      });
    });
    return arr;
  });
  const [tableData, setTableData] = useState<any[]>(() => defaultData);
  const [TrafficForm] = Form.useForm();

  const childrenColumns: any = [
    { title: '绿灯终止时刻（必填）', dataIndex: 'GreenStopTime', valueType: 'time' },
    { title: '放行（pcu/（C*ln）', dataIndex: 'pass', valueType: 'digit', editable: true },
    { title: '排队（pcu/（C*ln）', dataIndex: 'queueUp', valueType: 'digit' },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];
  const columns: any = [
    {
      title: '流向',
      dataIndex: 'flowDirection',
      key: 'flowDirection',
      valueType: 'text',
      width: '120',
    },
    {
      title: '绿灯时长',
      dataIndex: 'scGreenTime',
      key: 'scGreenTime',
      valueType: 'digit',
      width: '120',
    },
    {
      title: '描述',
      dataIndex: 'describe',
      key: 'describe',
      valueType: 'text',
    },
  ];

  const getConditionData = async () => (
    TrafficForm.validateFields().then(value => {
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
        onChange={setdata}
        params={props?.childrenData}
        request={async (params) => {
          return {
            data: props?.childrenData,
            success: true,
          };
        }}
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
        onChange={setTableData}
        recordCreatorProps={false}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="save"
              onClick={() => {
                console.log(tableData);
              }}
            >
              保存数据
            </Button>,
          ];
        }}
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
      <Form form={TrafficForm}>
        <Row>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="jtyxzk_xjfs"
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
            <Form.Item {...layout} name="jtyxzk_jl" label="结论" initialValue="配时方案运行正常。服务等级为C级别。">
              <Input placeholder="请输入结论" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
});

export default TrafficCondition
