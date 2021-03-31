import React, { useState, useRef, useImperativeHandle } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Divider,
} from 'antd';
import { PARTOL_WAY } from '@/const';
import _ from 'lodash';

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 14 },
};

const defaultData: any[] = [
  {
    id: 1,
    xtkz_lxbh: '1',
    xtkz_lxmc: '北左转',
    xtkz_kzcl: 0,
    xtkz_sjxg: 0,
    xtkz_jg: 0,
  },
  {
    id: 2,
    xtkz_lxbh: '2',
    xtkz_lxmc: '北直行',
    xtkz_kzcl: '绿波',
    xtkz_sjxg: 0,
    xtkz_jg: 0,
  },
  {
    id: 3,
    xtkz_lxbh: '4',
    xtkz_lxmc: '南左转',
    xtkz_kzcl: 0,
    xtkz_sjxg: 0,
    xtkz_jg: 0,
  },
  {
    id: 4,
    xtkz_lxbh: '5',
    xtkz_lxmc: '南直行',
    xtkz_kzcl: '绿波',
    xtkz_sjxg: 0,
    xtkz_jg: 0,
  },
];

const CoordinationControl: React.FC<any> = React.forwardRef((props, ref) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id)
  );
  const [tableData, setTableData] = useState<any[]>(defaultData);
  const canvasbox = useRef(null);
  const [control] = Form.useForm();

  const getControlData = async () => (
    control.validateFields().then(value => {
      return JSON.stringify({ tableData, formData: value })
    })
  )
  useImperativeHandle(ref, () => ({
    getControlData,
  }));

  const columns: any = [
    {
      title: '流向编号',
      dataIndex: 'xtkz_lxbh',
      width: '20%',
    },
    {
      title: '流向名称',
      dataIndex: 'xtkz_lxmc',
      width: '20%',
    },
    {
      title: '控制策略',
      dataIndex: 'xtkz_kzcl',
      width: '20%',
    },
    {
      title: '实际效果',
      dataIndex: 'xtkz_sjxg',
      width: '20%',
    },
    {
      title: '结果',
      dataIndex: 'xtkz_jg',
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
          >配流向时区图</div>
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
      <Form form={control}>
        <Row>
          <Col span={6}>
            <Form.Item
              {...layout}
              name="xtkz_xjfs"
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
            <Form.Item {...layout} name="xtkz_jl" label="结论" initialValue='方案运行正常'>
              <Input placeholder="请输入结论" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
});

export default CoordinationControl
