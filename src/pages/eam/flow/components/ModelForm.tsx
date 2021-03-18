import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Modal, TimePicker, message, Form } from 'antd';
import ProForm, { ProFormDatePicker } from '@ant-design/pro-form';
import { ProColumns, EditableProTable } from '@ant-design/pro-table';
import BaseApi from '@/utils/BaseApi';
import moment from 'moment';

// 时分转时间戳
const time_to_timestamp = (date: any) => {
  var time = date.split(' ')[1]
  var s = 0;
  var hour = time.split(':')[0]
  var min = time.split(':')[1]
  s = (Number(hour * 3600) + Number(min * 60)) * 1000;
  return s;
}

type DataSourceType = {
  id: React.Key;
  entranceExitDirection: string,
  uturnVolume: number,
  leftTurnVolume: number,
  straightVolume: number,
  rightTurnVolume: number
};

const defaultData: DataSourceType[] = [
  {
    id: 1,
    entranceExitDirection: '北',
    uturnVolume: 0,
    leftTurnVolume: 0,
    straightVolume: 0,
    rightTurnVolume: 0
  },
  {
    id: 2,
    entranceExitDirection: '南',
    uturnVolume: 0,
    leftTurnVolume: 0,
    straightVolume: 0,
    rightTurnVolume: 0
  },
  {
    id: 3,
    entranceExitDirection: '东',
    uturnVolume: 0,
    leftTurnVolume: 0,
    straightVolume: 0,
    rightTurnVolume: 0
  },
  {
    id: 4,
    entranceExitDirection: '西',
    uturnVolume: 0,
    leftTurnVolume: 0,
    straightVolume: 0,
    rightTurnVolume: 0
  },
]

const CreateForm: React.FC<any> = React.forwardRef((props, ref) => {
  const { modalVisible, onCancel, parentTable, intersectionId, formType } = props;
  const [TableData, setTableData] = useState<DataSourceType[]>(() => defaultData);
  const [trafficVolumeId, setTrafficVolumeId] = useState<string>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(
    defaultData.map((item) => item.id),
  );
  const childrenColumns: ProColumns<DataSourceType>[] = [
    { title: '方位', dataIndex: 'entranceExitDirection', key: 'entranceExitDirection', width: '20%' },
    { title: '掉头', dataIndex: 'uturnVolume', key: 'uturnVolume', valueType: 'digit', width: '20%' },
    { title: '左转', dataIndex: 'leftTurnVolume', key: 'leftTurnVolume', valueType: 'digit', width: '20%' },
    { title: '直行', dataIndex: 'straightVolume', key: 'straightVolume', valueType: 'digit', width: '20%' },
    { title: '右转', dataIndex: 'rightTurnVolume', key: 'rightTurnVolume', valueType: 'digit', width: '20%' },
  ];
  const [modelForm] = Form.useForm();

  useImperativeHandle(ref, () => ({
    editForm,
  }));

  useEffect(() => {
    if(formType === 'creat') {
      modelForm.resetFields()
      setTableData(defaultData)
      setEditableRowKeys(defaultData.map((item) => item.id))
    }
  }, [formType]);

  // 设置表单值
  const editForm = (data: any) => {
    const newrecord = JSON.parse(JSON.stringify(data))
    newrecord.comBeginTime = moment(newrecord.comBeginTime).utc().utcOffset(0)
    newrecord.comEndTime = moment(newrecord.comEndTime).utc().utcOffset(0)
    newrecord.comRecordDate = moment(newrecord.comRecordDate)
    setTrafficVolumeId(newrecord.id)
    if(data.trafficVolumeDetailList.length !== 0){
      setEditableRowKeys(data.trafficVolumeDetailList.map((item: any) => item.id))
      setTableData(data.trafficVolumeDetailList)
    }else{
      setEditableRowKeys(defaultData.map((item) => item.id))
      setTableData(defaultData)
    }
    modelForm.setFieldsValue({timeRange: [newrecord.comBeginTime, newrecord.comEndTime], comRecordDate: newrecord.comRecordDate })
  }
  
  // 新增
  const handleAdd = async (value: any, dataSource: any) => {
    const newParams ={
      comBeginTime: time_to_timestamp(value.timeRange[0]),
      comEndTime: time_to_timestamp(value.timeRange[1]),
      comRecordDate: new Date(value.comRecordDate).getTime(),
      trafficVolumeDetailList: dataSource
    }
    const msg = await BaseApi('/api/biz/intersection/' + intersectionId + '/traffic-volume/').save(newParams);
    if (msg.code == 0) {
      message.success('添加成功');
      onCancel()
      parentTable.current ? parentTable.current.reload() : null
      return true;
    } else {
      message.error('添加失败请重试！');
      return false;
    }
  };

  // 编辑
  const handleUpdate = async (value: any, dataSource: any) => {
    const newParams ={
      comBeginTime: time_to_timestamp(value.timeRange[0]),
      comEndTime: time_to_timestamp(value.timeRange[1]),
      comRecordDate: new Date(value.comRecordDate).getTime(),
      trafficVolumeDetailList: dataSource.length > 4 ? dataSource.slice(4) : dataSource
    }
    const msg = await BaseApi('/api/biz/intersection/' + intersectionId + '/traffic-volume/').update(trafficVolumeId, newParams);
    if (msg.code == 0) {
      message.success('更新成功');
      onCancel()
      parentTable.current ? parentTable.current.reload() : null
      return true;
    } else {
      message.error('更新失败请重试！');
      return false;
    }
  };

  return (
    <Modal
      width={640}
      destroyOnClose
      title="新建流量"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        form={modelForm}
        name="modelForm"
        onFinish={async (value) => {
          if(formType === 'creat') {
            handleAdd(value, TableData)
            
          } else if(formType === 'update') {
            handleUpdate(value, TableData)
          }
        }}
      >
        <ProFormDatePicker name="comRecordDate" label="采集日期" rules={[{ required: true, message: '请选择采集日期' }]} />
        <ProForm.Item name="timeRange" label="采集时段" rules={[{ required: true, message: '请选择采集时段' }]}>
          <TimePicker.RangePicker format={'HH:mm'} />
        </ProForm.Item>
        <ProForm.Item
          name='trafficVolumeDetailList'
        >
          <EditableProTable<DataSourceType>
            size="small"
            bordered={true}
            rowKey="id"
            maxLength={4}
            recordCreatorProps={false}
            columns={childrenColumns}
            request={async () => ({
              data: TableData,
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
        </ProForm.Item>
      </ProForm>
    </Modal>
  );
});

export default CreateForm;
