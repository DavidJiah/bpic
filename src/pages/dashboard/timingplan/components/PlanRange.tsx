/*
 * @Author: Dad
 * @Date: 2021-03-08 16:20:04
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-18 17:55:44
 */
/*
时间计划
*/
import 'rc-slider/assets/index.css';
import ProCard from '@ant-design/pro-card';
import { Button, Form, TimePicker, Modal, Tag, Select } from 'antd';
import { parseTime, timeFn } from '@/utils/utils';
import _ from 'lodash';
import { TIME_PLAN, DAY_VAL, ZERO_MOMENT } from '@/const';
import styles from './plan.less';
import { useState } from 'react';
import moment from 'moment';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [width, setWidth] = useState<any>();
  const [left, setLeft] = useState<any>();
  const [form] = Form.useForm();

  /**
   * 提交时间计划
   */
  const handleUploadSubmit = () => {
    const obj = form?.getFieldsValue();
    setWidth(((moment(obj.endTime).unix() - moment(obj.createTime).unix()) / DAY_VAL) * 100);
    setLeft(((moment(obj.createTime).unix() - ZERO_MOMENT) / DAY_VAL) * 100);
    TIME_PLAN.push({ color: '#1a61dc', key: 4, value: '方案一' });
    setVisible(false);
  };

  return (
    <>
      <ProCard title="时间计划" className="ant-card">
        <div>
          {_.map(TIME_PLAN, (item: any) => (
            <Tag color={item.color} key={item.key}>
              {item.value}
            </Tag>
          ))}
        </div>
        <div className={styles.planLine}>
          <div className={styles.unPlan} />
          <div
            className={styles.plan}
            style={{
              width: `${width}%`,
              backgroundColor: `#1a61dc`,
              marginLeft: `${left}%`,
              color: 'black',
            }}
          >
            方案一
          </div>
        </div>
        <Button onClick={() => setVisible(true)}>新增</Button>
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={handleUploadSubmit}
          onCancel={() => setVisible(false)}
        >
          <Form {...layout} name="basic" initialValues={{ remember: true }} form={form}>
            <Form.Item
              label="起始时间"
              name="createTime"
              rules={[{ required: true, message: '请选择开始时间!' }]}
            >
              <TimePicker />
            </Form.Item>
            <Form.Item
              label="结束时间"
              name="endTime"
              rules={[{ required: true, message: '请选择结束时间!' }]}
            >
              <TimePicker />
            </Form.Item>
            <Form.Item
              label="选择方案"
              name="program"
              rules={[{ required: true, message: '请选择方案!' }]}
            >
              <Select style={{ width: 120 }}>
                {_.map(TIME_PLAN, (item: any) => (
                  <Select.Option value={item.key}>{item.value}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </ProCard>
    </>
  );
};
