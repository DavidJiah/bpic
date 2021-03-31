import React, { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SubPhaseTable from './SubPhaseTable';
import { POSITION_ALL } from '@/const';
import {
  queryControlPlan,
  addControlPlan,
  updateControlPlan,
  deleteControlPlan,
  querySubControlPlan,
} from '../service';

export type Status = {
  color: string;
  text: string;
};

export default (props: any) => {
  const { phasescs, updatePhases, intersectionId, setEdit } = props;  
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const columns: ProColumns<any>[] = [
    {
      title: '方案编号',
      dataIndex: 'scControlPlanCode',
      key: 'scControlPlanCode',
      valueType: 'text',
      width: 120,
    },
    {
      title: '方案描述',
      dataIndex: 'scDescription',
      key: 'scDescription',
      valueType: 'text',
    },
    {
      title: '周期',
      dataIndex: 'scCycleTime',
      key: 'scCycleTime',
      valueType: 'digit',
      width: 120,
    },
    {
      title: '相位差',
      dataIndex: 'scOffset',
      key: 'scOffset',
      valueType: 'digit',
      width: 120,
    },
    {
      title: '协调流向',
      dataIndex: 'scCoordinateDirection',
      key: 'scCoordinateDirection',
      valueType: 'select',
      valueEnum: POSITION_ALL,
      width: 140,
    },
    {
      title: '相序相位数',
      dataIndex: 'scPhaseCount',
      key: 'scPhaseCount',
      valueType: 'digit',
      width: 120,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (_, row: any, index, action) => [
        <a
          key="editable"
          onClick={async () => {
            if (expandedRowKeys.length >= 1) {
              return;
            }
            row.isEdit = true;
            const msg = await querySubControlPlan(intersectionId, row.id);
            const { phaseList } = msg.data;
            updatePhases(phaseList);
            setExpandedRowKeys([row.id]);
            action.startEditable(row.id);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="del"
          title="是否确定删除?"
          onConfirm={async () => {
            const msg = await deleteControlPlan(intersectionId, row.id);
            if (msg.code === 0) message.success('删除成功');
            else message.error('删除失败，请联系管理员');
            action.reload();
          }}
        >
          <a> 删除 </a>
        </Popconfirm>,
        <a key="delete" onClick={() => {}}>
          导入
        </a>,
      ],
    },
  ];
  const expandedRowRender = (
  ) => {
    return <SubPhaseTable subPhasescs={phasescs} setEdit={setEdit} />;
  };
  return (
    <>
      <ProTable<any>
        actionRef={actionRef}
        size="small"
        bordered={true}
        columns={columns}
        request={async () => {
          updatePhases([]);
          const msg = await queryControlPlan(intersectionId);
          return {
            data: msg.data.controlPlanList,
            success: true,
            total: msg.data.total,
          };
        }}
        rowKey="id"
        pagination={false}
        expandable={{
          expandedRowRender,
          rowExpandable: (record: any) => record.isEdit,  
          expandedRowKeys,
          onExpand: (expanded: any, record: any) => {
            if (!expanded) setExpandedRowKeys([]);
            else setExpandedRowKeys([record.id]);
          },
        }}
        toolBarRender={() => [
          <Button
            type="dashed"
            ghost
            onClick={() => actionRef.current?.addEditRecord({ intersectionId })}
          >
            <PlusOutlined />
            添加
          </Button>,
        ]}
        search={false}
        dateFormatter="string"
        headerTitle="配时方案信息"
        options={false}
        editable={{
          type: 'single',
          editableKeys,
          onSave: async (key, row) => {
            if (row.id) {
              const msg = await updateControlPlan(intersectionId, row.id, row, phasescs);
              if (msg.code === 0) message.success('修改成功');
              else message.error('修改失败，请联系管理员');
            } else {
              const msg = await addControlPlan(intersectionId, row);
              if (msg.code === 0) message.success('新增成功');
              else message.error('新增失败，请联系管理员');
            }
            row.isEdit = false;
            setExpandedRowKeys([]);
            actionRef.current?.reload();
            return true;
          },
          onCancel: async () => {
            setExpandedRowKeys([]);
            updatePhases([]);
            actionRef.current?.reload();
            return true;
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};
