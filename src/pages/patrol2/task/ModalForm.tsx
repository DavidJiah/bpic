import React, { useState, useEffect } from 'react';
import { Modal, Form, message, Checkbox } from 'antd';
import ProForm, { ProFormDateRangePicker } from '@ant-design/pro-form';
import { getIntersectionFiling, creatData, update } from './service';
import _ from 'lodash';

const ModalForm = (props: any) => {
  const { modalVisible, onCancel, ModalType, editData } = props;
  const [FormModel] = Form.useForm();
  const [checkAll, setCheckAll] = React.useState(false); // 是否全选
  const [checkboxGroup, setcheckboxGroup] = useState<any>([]); // 选择路口数据
  const [checkedList, setcheckedList] = useState<any>([]); // 选中的值
  const [Formdata, setFormdata] = useState<any>({
    dailyTask: {
      inspTaskOwner: '蒋良长',
      inspTaskDate: '20210201~20210404',
      inspTaskRemark: '',
    },
    dailyTaskIntersectionList: [
      {
        intIntersectionName: '万达片区-龙洲路-关公路路口',
        intIntersectionId: '10',
      },
    ],
  });

  const getIntersectionInfo = async () => {
    const { code, msg, data } = await getIntersectionFiling();
    if (code === 0)
      setcheckboxGroup(
        _.map(data, (item: any) => ({
          label: item?.intIntersection?.intIntersectionName,
          value: item?.intIntersection?.id,
        })),
      );
    else message.warning(msg);
  };

  useEffect(() => {
    getIntersectionInfo();
    ModalType === '编辑' ? FormModel.setFieldsValue({ ...editData }) : FormModel.resetFields();
  }, [editData, ModalType]);

  const creatdata = async (formData: any) => {
    const newlist = _.map(checkedList, (item: any) => ({
      intIntersectionId: item || undefined,
      intIntersectionName: _.find(checkboxGroup, {value: item})?.label
    }))
    const { code, msg } = await creatData({...formData}, newlist);
    if (code === 0) message.success('新增成功');
    else message.error(msg);
  };

  const editdata = async (formData: any) => {
    formData.takingTime = new Date(formData.takingTime).getTime();
    const { code, msg } = await update(formData, editData);
    if (code === 0) message.success('更新成功');
    else message.error(msg);
  };

  const onCheckAllChange = (e: any) => {
    setcheckedList(e.target.checked ? _.map(checkboxGroup, (item: any) => item.value) : []);
    setCheckAll(e.target.checked);
  };

  const onChange = (list: any) => {
    setcheckedList(list);
    setCheckAll(list.length === checkboxGroup.length);
  };

  return (
    <>
      <Modal
        width={740}
        destroyOnClose
        title={ModalType}
        visible={modalVisible}
        getContainer={false}
        onCancel={() => onCancel()}
        footer={null}
      >
        <ProForm
          form={FormModel}
          name="FormModel"
          onFinish={async (data: any) => {
            ModalType === '编辑' ? editdata(data) : creatdata(data);
          }}
        >
          <ProForm.Group>
            <ProFormDateRangePicker name="dateRange" label="巡检时间" />
          </ProForm.Group>
          <ProForm.Item name="dailyTaskIntersectionList">
            <Checkbox onChange={onCheckAllChange} checked={checkAll}>
              全选
            </Checkbox>
            <Checkbox.Group options={checkboxGroup} value={checkedList} onChange={onChange} />
          </ProForm.Item>
        </ProForm>
      </Modal>
    </>
  );
};

export default ModalForm;
