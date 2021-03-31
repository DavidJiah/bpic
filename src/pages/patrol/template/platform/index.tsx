/*
 * @Author: Dad
 * @Date: 2021-03-19 14:21:22
 * @LastEditTime: 2021-03-20 16:48:04
 * @LastEditors: Dad
 * @Description:
 */
import { Button, Form, Row, Select, Col, DatePicker, Input, Space } from 'antd';
// import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import styles from '../index.less';
import _ from 'lodash';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';

const Comp: React.FC<any> = () => {
  const [form] = Form.useForm();

  const columns: ProColumns<any>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            max: 16,
            whitespace: true,
            message: '最长为 16 位',
          },
          {
            min: 6,
            whitespace: true,
            message: '最小为 6 位',
          },
        ],
      },
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  const defaultData: any[] = [
    {
      id: 624748504,
      title: '活动名称一',
      decs: '这个活动真好玩',
      state: 'open',
      created_at: '2020-05-26T09:42:56Z',
    },
    {
      id: 624691229,
      title: '活动名称二',
      decs: '这个活动真好玩',
      state: 'closed',
      created_at: '2020-05-26T08:19:22Z',
    },
  ];

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [dataSource, setDataSource] = useState<any[]>(() => defaultData);

  return (
    <div className="template">
      <Form form={form}>
        <Form.Item name="timer" label="选择路线">
          <Select style={{ width: 200 }}>
            <Select.Option value="jack">Jack</Select.Option>
          </Select>
        </Form.Item>
        <div className={styles.title}>xx路径平台巡检报告</div>
        <div className={styles.content}>
          <Row>
            <Col span={3}>
              <div className={styles.label}>路线概况 (*)</div>
            </Col>
            <Col span={2}>
              <Form.Item name="affd" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>巡检日期</div>
            </Col>
            <Col span={3}>
              <Form.Item name="ajjjsd" className={styles.label}>
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>巡检时段</div>
            </Col>
            <Col span={4}>
              <Form.Item name="jjasd" className={styles.label}>
                <DatePicker.RangePicker picker="time" format="HH:mm" />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>巡检人员</div>
            </Col>
            <Col span={2}>
              <Form.Item name="asjjd" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item name="asjjd" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item name="asjjd" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div className={styles.label}>巡检方式 (*)</div>
            </Col>
            <Col span={2}>
              <Form.Item name="asasdd" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>天气</div>
            </Col>
            <Col span={3}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>联系电话</div>
            </Col>
            <Col span={4}>
              <Form.Item name="lxdh" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>信号周期</div>
            </Col>
            <Col span={2}>
              <Form.Item name="asjjd" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item name="asjjd" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item name="asjjd" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div className={styles.label}>基本概况(*)</div>
            </Col>
            <Col span={21}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={1}>
              <div className={styles.label}>序号</div>
            </Col>
            <Col span={4}>
              <div className={styles.label}>路口名称 (*)</div>
            </Col>
            <Col span={2}>
              <div className={styles.label}>信号机品牌</div>
            </Col>
            <Col span={3}>
              <div className={styles.label}>记录延迟时长 (s)</div>
            </Col>
            <Col span={4}>
              <div className={styles.label}>第一相位复亮所需时长(s)</div>
            </Col>
            <Col span={3}>
              <div className={styles.label}>预设绝对相位差</div>
            </Col>
            <Col span={3}>
              <div className={styles.label}>实测绝对相位差</div>
            </Col>
            <Col span={2}>
              <div className={styles.label}>差值</div>
            </Col>
            <Col span={2}>
              <div className={styles.label}>评估</div>
            </Col>
          </Row>

          <EditableProTable<any>
            columns={columns}
            rowKey="id"
            value={dataSource}
            onChange={setDataSource}
            recordCreatorProps={false}
            editable={{
              type: 'multiple',
              editableKeys,
              onValuesChange: (record, recordList) => {
                setDataSource(recordList);
              },
              onChange: setEditableRowKeys,
            }}
          />
          
          <Row>
            <Col span={3}>
              <div className={styles.label}>结论</div>
            </Col>
            <Col span={21}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className={styles.bottomLine}>
          <Space size="middle">
            <Button type="primary" style={{ width: 100 }}>
              下载
            </Button>
            <Button type="primary" style={{ width: 100 }}>
              返回
            </Button>
            <Button
              type="primary"
              style={{ width: 100 }}
              onClick={() => {
                console.log(form.getFieldsValue());
              }}
            >
              提交审核
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};
export default Comp;
