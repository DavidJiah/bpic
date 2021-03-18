/*
 * @Author: Dad
 * @Date: 2021-03-11 17:16:56
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-12 15:22:11
 */
import React, { useState } from 'react';
import { Modal, Form, Input, Col, Row } from 'antd';
import GlobalUpload from '@/components/GlobalUpload';

const ImgUpload: React.FC<{ visible: boolean, closeModal: any, initialValues: any, imgUrl?: string }> = ({ visible, closeModal, initialValues, imgUrl }) => {
  const [form] = Form.useForm();

  const handleOk = () => {

  };

  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };

  return (
    <>
      <Modal title={'上传' + initialValues?.businessType} visible={visible} onOk={handleOk} onCancel={closeModal}>
        <Form
          {...layout}
          name="basic"
          form={form}
          initialValues={{ remember: true }}
        >
          {
            initialValues?.businessType == '周围环境因素图' || initialValues?.businessType == '路口设施设备图' ? (
              <Row>
                <Col span={12}>
                  <Form.Item
                    {...layout}
                    name="username"
                    rules={[{ required: true, message: '请输入基准方向!' }]}
                  >
                    <Input placeholder='输入基准方向' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    {...layout}
                    name="username"
                    rules={[{ required: true, message: '请输入距离(米)!' }]}
                  >
                    <Input placeholder='请输入距离(米)' />
                  </Form.Item>
                </Col>
              </Row>) : ''
          }
          <Form.Item
            name="username"
            {...layout}
            rules={[{ required: true, message: '请输入备注!' }]}
          >
            <Input.TextArea placeholder='输入备注' />
          </Form.Item>
          <Form.Item name="idCardFront" {...layout}>
            <GlobalUpload
              imgUrl={imgUrl}
              initialValues={initialValues}
              onChange={(e) => { console.log(e) }}
              type="big"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ImgUpload