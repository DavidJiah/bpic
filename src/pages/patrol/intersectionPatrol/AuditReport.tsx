import React, { useState } from 'react';
import { DatePicker, Form, Input, Card, Button, Space, Radio, List, Modal } from 'antd';
import style from './index.less';
import _ from 'lodash'
import { history } from 'umi';
import moment from 'moment';
import { GithubFilled } from '@ant-design/icons';

const data = {
  patrolNumber: 12,
  patrolTime: '2020-11-12',
  detail: [
    {
      title: '龙洲路-关公路路口',
      state: '正常',
      content: '',
      id: '1',
    },
    {
      title: '康富路-桃花仑路路口',
      state: '异常',
      content: 'XXXXXXXX',
      id: '2',
    },
    {
      title: '康富路-桃花仑路路口',
      state: '正常',
      content: '',
      id: '3',
    },
    {
      title: '康富路-桃花仑路路口',
      state: '正常',
      content: '',
      id: '4',
    },
  ]
}


const AuditReport = (props: any) => {
  const [modalVisible, setmodalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const submit = () => {
    console.log(form.getFieldValue('dismissTheReason'))
    setmodalVisible(false)
  }

  return (
    <>
      <Card bordered={false} className={style?.auditReport}>
        <div className={style?.patrolInfo}>
          <div className={style?.patrolInfoBox}>
            <span>巡检计划路口总数：{data?.patrolNumber}</span>
            <span>巡检日期：{data?.patrolTime}</span>
          </div>
          <Space>
            <Button onClick={() => { history.goBack() }}>返回</Button>
            <Button type="primary" onClick={() => { setmodalVisible(true) }}>驳回</Button>
          </Space>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={data?.detail}
          bordered
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item?.title}
              />
              <Space size='large' className={style?.content}>
                <Form.Item label='采集日期'>
                  <DatePicker.RangePicker disabled defaultValue={[moment('2015/01/01'), moment('2015/01/01')]} />
                </Form.Item>
                <Form.Item label='巡检结果'>
                  <Radio.Group disabled defaultValue={item?.state}>
                    <Radio value={'正常'}>正常</Radio>
                    <Radio value={'异常'}>异常</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label='异常内容'>
                  <Input disabled defaultValue={item?.content} />
                </Form.Item>
                <Form.Item>
                  <Button type='primary' onClick={() => { history.push({ pathname: '/patrol/submitReport', query: { id: item?.id } }) }}>查看详情</Button>
                </Form.Item>
              </Space>
            </List.Item>
          )}
        />
      </Card>
      <Modal
        destroyOnClose
        title={'驳回原因'}
        visible={modalVisible}
        onCancel={() => setmodalVisible(false)}
        getContainer={false}
        footer={[
          <Button key="submit" onClick={() => { setmodalVisible(false) }}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={() => { submit() }}>
            提交
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="FormModel"
        >
          <Form.Item name='dismissTheReason'>
            <Input.TextArea rows={5} showCount maxLength={200} placeholder='说明不超过200字~' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AuditReport;