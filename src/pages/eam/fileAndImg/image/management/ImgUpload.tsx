/*
 * @Author: Dad
 * @Date: 2021-03-11 17:16:56
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-12 15:22:11
 */
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Col, Row, Button, message } from 'antd';
import GlobalUpload from '@/components/GlobalUpload';
import { updateFile } from '../../services'

const ImgUpload: React.FC<{ visible: boolean, closeModal: any, initialValues: any, imgUrl?: string, rowData:any, type: any, initList:any }> = ({ visible, closeModal, initialValues, imgUrl, rowData, type, initList }) => {
  const [form] = Form.useForm();
  const [fileId, setFileId] = useState<string | number>();

  const handleOk = () => {
    form.validateFields().then(async(values) => {
      delete values.idCardFront
      if(fileId || rowData.id) {
        const formData: any = new FormData()
        formData.append('moduleCode', 'uscp');
        values.attribute1?formData.append('attribute1', values?.attribute1):null
        values.attribute2?formData.append('attribute2', values?.attribute2):null
        values.attribute5?formData.append('attribute5', values?.attribute5):null
        const {msg, code} = await updateFile(fileId || rowData?.id, formData)
        if(+code === 0) closeModal(false), message.success(type=='edit'?'修改成功':'保存成功'), initList()
        else message.error(msg)
      }
    })
  };

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue({...rowData})
  }, [rowData]);

  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };

  return (
    <>
      <Modal
        title={'上传' + initialValues?.businessType}
        visible={visible}
        footer={[
          <Button key="back" type="primary" onClick={() => closeModal()}>
            取消
          </Button>,
          <Button key="submit" type="primary" htmlType={'submit'} onClick={() => handleOk()}>
            确定
          </Button>,
        ]}
      >
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
                    name="attribute1"
                    rules={[{ required: true, message: '请输入基准方向!' }]}
                  >
                    <Input placeholder='输入基准方向' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    {...layout}
                    name="attribute5"
                    rules={[{ required: true, message: '请输入距离(米)!' }]}
                  >
                    <Input placeholder='请输入距离(米)' />
                  </Form.Item>
                </Col>
              </Row>) : ''
          }
          <Form.Item
            name="attribute2"
            {...layout}
            rules={[{ required: true, message: '请输入备注!' }]}
          >
            <Input.TextArea placeholder='输入备注' />
          </Form.Item>
          <Form.Item name="idCardFront" {...layout} rules={[{ required: type!=='edit', message: '请上传图片!' }]}>
            <GlobalUpload
              imgUrl={imgUrl}
              editID={rowData?.id}
              initialValues={initialValues}
              onChange={(e: any) => { setFileId(e.id) }}
              type="big"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ImgUpload