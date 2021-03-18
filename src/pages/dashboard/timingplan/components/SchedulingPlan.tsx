// 调度计划
import React, { useState, useRef } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { message, Popconfirm, Tag } from 'antd'
import { savePlanSchedule, delPlanSchedule, updataPlanSchedule, queryPlanSchedule } from '../service'
import _ from 'lodash'
import { MONTH_ALL, WEEK_ALL, DATA_ALL } from '@/const'

export default (props: any) => {
  const { intersectionId = '10' } = props
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const actionRef = useRef<ActionType>();
  const [newRecord] = useState({
    id: null,
  });

  const columns: ProColumns<any>[] = [
    {
      title: '调度计划',
      dataIndex: 'scDailyPlanId',
      valueType: 'digit',
      width: 120
    },
    {
      title: '调度描述',
      dataIndex: 'scDescription',
      width: 180
    },
    {
      title: '月份',
      dataIndex: 'scSelectedMonths',
      valueType: 'checkbox',
      valueEnum: MONTH_ALL,
      width: 200,
      render: (dom: any) => {
        const tags = dom.props.text.map((item: string) => MONTH_ALL[item])
        return tags.map((item: string) => (<Tag color="volcano">{item}</Tag>))
      }
    },
    {
      title: '日期',
      dataIndex: 'scSelectedDays',
      valueType: 'checkbox',
      valueEnum: DATA_ALL,
      width: 300,
      render: (dom: any) => {
        const tags = dom.props.text.map((item: string) => DATA_ALL[item])
        return tags.map((item: string) => (<Tag color="gold">{item}</Tag>))
      }
    },
    {
      title: '星期',
      dataIndex: 'scSelectedWeeks',
      valueType: 'checkbox',
      valueEnum: WEEK_ALL,
      width: 180,
      render: (dom: any) => {
        const tags = dom.props.text.map((item: string) => WEEK_ALL[item])
        return tags.map((item: string) => (<Tag color="blue">{item}</Tag>))
      }
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
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
            const msg = await delPlanSchedule(intersectionId, record.id)
            if (msg.code === 0)
              message.success('删除成功');
            else
              message.error('删除失败，请联系管理员')
            action.reload()
          }
        }>
          <a> 删除 </a>
        </Popconfirm>,
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
        headerTitle="调度计划"
        recordCreatorProps={{ position: 'bottom', record: newRecord }}
        columns={columns}
        request={async () => {
          const res = await queryPlanSchedule(intersectionId)
          const rlist = res.data.planScheduleList.map((item: any) => {
            item.scSelectedDays = _.split(item.scSelectedDays, ',')
            item.scSelectedWeeks = _.split(item.scSelectedWeeks, ',')
            item.scSelectedMonths = _.split(item.scSelectedMonths, ',')
            return item
          })


          return {
            data: rlist,
            success: true
          }
        }
        }
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (key, row) => {
            const model = JSON.parse(JSON.stringify(row))
            model.scSelectedDays = _.isArray(row.scSelectedDays) ? row.scSelectedDays.join() : row.scSelectedDays
            model.scSelectedWeeks = _.isArray(row.scSelectedWeeks) ? row.scSelectedWeeks.join() : row.scSelectedWeeks
            model.scSelectedMonths = _.isArray(row.scSelectedMonths) ? row.scSelectedMonths.join() : row.scSelectedMonths
            if (!model.id) {
              const msg = await savePlanSchedule(intersectionId, model)
              if (msg.code === 0)
                message.success('新增成功');
              else
                message.error('新增失败，请联系管理员')
            } else {
              const msg = await updataPlanSchedule(intersectionId, model.id, model)
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