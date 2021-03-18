import React, { useState, useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import ProForm, { ProFormText, ProFormDatePicker, ProFormSelect } from '@ant-design/pro-form';
import { getIntersectionInfo, save, uplaod, saveForm } from '../list/service'
import GlobalUpload from '@/components/GlobalUpload';
import { OPINION_TYPE } from '@/const'
import _ from 'lodash';

const FormModal = (props: any) => {
  const { modalVisible, onCancel, ModalType, editData, initList } = props;
  const [imageUrl, setImageUrl] = useState<any>('');
  const [FormModel] = Form.useForm();
  const [Formdata] = useState<any>({
    clsc: '',
    proposalPersonName: 'XXX',
    feedBackStatus: '未处理',
    delegationUnit: '益阳市公安局交通警察支队',
    receptionUnit: '湖南中大设计院智慧交通所',
    proposalContent: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    feedBackContent: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  });

  useEffect(() => {
    if (ModalType === '编辑') {
      console.log(editData)
      FormModel.setFieldsValue({ ...editData })
    } else {
      FormModel.resetFields()
    }
  }, [editData, ModalType])

  const creatdata = async (formData: any) => {
    formData.publicSentimentFile = formData.publicSentimentFile.id
    formData.takingTime = new Date(formData.takingTime).getTime()
    formData.feedBackStatus = '未处理'
    const { code, msg, data } = await save(formData)
    if (code === 0) message.success('保存成功'), await saveForm(Formdata, data.id), onCancel(), initList()
    else message.error(msg)
  }

  const editdata = async (formData: any) => {
    formData.takingTime = new Date(formData.takingTime).getTime()
    const { code, msg } = await uplaod(formData, editData)
    if (code === 0) message.success('更新成功')
    else message.error(msg)
  }

  return (
    <>
      <Modal
        width={740}
        destroyOnClose
        title={ModalType}
        visible={modalVisible}
        onCancel={() => onCancel()}
        getContainer={false}
        footer={null}
      >
        <ProForm
          form={FormModel}
          name="FormModel"
          onFinish={async (data: any) => {
            ModalType === '编辑' ? editdata(data) : creatdata(data)
          }}
        >
          <ProFormText width="md" name="publicSentimentCode" label="舆情编号" placeholder="请输入舆情编号" rules={[{ required: true, message: '请输入舆情编号' }]} />
          <ProForm.Group>
            <ProFormSelect
              width="md"
              name="publicSentimentSource"
              label="舆情来源"
              initialValue="市长热线"
              request={async () => [
                { label: '市长热线', value: '市长热线' }
              ]}
              placeholder="Please select a country"
            />
            <ProFormDatePicker width="md" name="takingTime" label="接单日期" rules={[{ required: true, message: '请选择接单日期' }]} />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              width="md"
              name="publicSentimentType"
              label="舆情类型"
              placeholder="请选择舆情类型"
              rules={[{ required: true, message: '请选择舆情类型' }]}
              request={async () => (_.map(OPINION_TYPE, (e: any) => ({ label: e.value, value: e.value })))}
            />
            <ProFormSelect
              width="md"
              name="correlateIntersection"
              label="关联路口"
              placeholder="请选择关联路口"
              rules={[{ required: true, message: '请选择关联路口' }]}
              request={async () => {
                const { data } = await getIntersectionInfo()
                return (_.map(data, (e: any) => ({ label: e.intersectionName, value: e.intersectionName })))
              }}
            />
          </ProForm.Group>
          <Form.Item
            name="publicSentimentFile"
            label="舆情单上传"
          >
            <GlobalUpload
              imgUrl={''}
              initialValues={{businessType: '舆情单', id: '12' }}
              onChange={(e: any) => { console.log(e) }}
              type="big"
            />
          </Form.Item>
        </ProForm>
      </Modal>
    </>
  );
};

export default FormModal;