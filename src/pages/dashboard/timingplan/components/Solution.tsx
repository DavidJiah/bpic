// 方案策略
import React, { useState,useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import {message,Popconfirm,TimePicker} from 'antd';
import {queryControlStrategyList,saveControlStrategy,delControlStrategy,updataControlStrategy,queryControlPlanList} from '../service'
import {toHHmmss,toHHmmssTime} from '@/utils/utils'
import _ from 'lodash'

const RangeTime: React.FC<{
  value?: any[];
  onChange?: (
    value: any[],
  ) => void;
}> = ({ value, onChange }) => {
  const ref = useRef(null);
  const [rangeTimeValue, setRangeTimeValue] = useState([]);
  const handleChange = (values: any) => {
    setRangeTimeValue(values);
  };
  const handleConfirm = () => {
    onChange?.(rangeTimeValue);  
  }
  return ( 
      <TimePicker.RangePicker 
        ref={ref}
        style={{ width: '100%' }}
        onChange={handleChange}
        onBlur={handleConfirm}
      />
      
  );
};

export default (props: any) => {
  const actionRef = useRef<ActionType>();
  const {intersectionId} = props
  const [planEnum, setPlanEnum] = useState({});
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [newRecord] = useState({id: null, });
  
  const columns: ProColumns<any>[] = [
    {
      title: '时间',
      dataIndex: 'comTime',
      width:240,
      renderFormItem: () => <RangeTime />,
      render: (_, row) => { 
        return `${row?.comBeginTime?toHHmmss(row.comBeginTime):''}-${ row?.comEndTime ? toHHmmss(row.comEndTime):''}`
      },
    },
    {
      title: '路口问题',
      dataIndex: 'scProblemDescription',
      valueType: 'text'
    },
    {
      title: '策略',
      dataIndex: 'scStrategyDescription',
      valueType: 'text'
    },
    {
      title: '方案',
      dataIndex: 'scControlPlanId',
      valueType: 'select',
      valueEnum:planEnum
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
         <Popconfirm key="del" title="是否确定删除?" onConfirm={
          async () => {
            const msg = await delControlStrategy(intersectionId,record.id)
            if (msg.code === 0)
              message.success('删除成功');
            else
              message.error('删除失败，请联系管理员')
            action.reload()
          }
        }>
        <a> 删除 </a>
        </Popconfirm> ,
      ],
    },
  ];
  return (
    <>
      <EditableProTable<any>
        actionRef={actionRef}
        size="small"
        bordered={true}
        rowKey="id"
        headerTitle="方案策略"
        recordCreatorProps={
          {position: 'bottom',  record: newRecord, }
        } 
        onLoad={ async()=>{
          const msg = await queryControlPlanList(intersectionId)
          const planEnum= {}
          msg?.data?.controlPlanList?.forEach((item: any)=>{
            planEnum[item.scControlPlanCode]={text:item.scControlPlanCode}
          })
          setPlanEnum(planEnum)
        }}
        columns={columns}
        request={async () => {
          const msg = await queryControlStrategyList(intersectionId)
          return {
          data: msg.data.controlStrategyList,
          success: true,
        }
        }
       }
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (key, row) => {
            const model = JSON.parse(JSON.stringify(row))
            if(model.comTime && _.isArray(model.comTime) && model.comTime.length===2){
              model.comBeginTime = toHHmmssTime(new Date(model.comTime[0]))
              model.comEndTime =  toHHmmssTime(new Date(model.comTime[1]))
              delete model.comTime
            }
            if(!model.id){
              const msg = await saveControlStrategy(intersectionId,model)
              if (msg.code === 0)
                message.success('新增成功');
               else
                message.error('新增失败，请联系管理员')
            }else{
              const msg = await updataControlStrategy(intersectionId,model.id,model)
              if (msg.code === 0)
                message.success('更新成功');
              else
               message.error('更新失败，请联系管理员')
            }
            actionRef.current?.reload()
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};