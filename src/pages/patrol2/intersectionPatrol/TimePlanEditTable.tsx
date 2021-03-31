import React, { useState } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Button } from 'antd';
import { POSITION_ALL } from '@/const';

const defaultData = [
  {
    id: 1,
    timeRange: '6:00-7:00',
    scControlPlanCode: '一',
    scOffset: 54,
    scCycleTime: 130,
  },
];

const childrenData = [
  {
    id: 1,
    scAllRedTime: 1,
    scCoordinateDirection: "2",
    scDirectionCode: 2,
    scFlashingGreenTime: 3,
    scGreenTime: 4,
    scOffset: 5,
    scPhaseNumber: 6,
    scYellowTime: 7,
  },
];

export default (props: any) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [childrenEditableKeys, setchildrenEditableKeys] = useState<React.Key[]>(() =>
    childrenData.map((item) => item.id),
  );
  const [tableData, setTableData] = useState<any[]>(() => defaultData);
  const [childrenTableData, setchildrenTableData] = useState<any[]>(childrenData);

  const childrenColumns: any = [
    { title: '相序代号', dataIndex: 'scDirectionCode', valueType: 'digit' },
    { title: '相位序号', dataIndex: 'scPhaseNumber', valueType: 'digit', width: 80, editable: true },
    { title: '绿灯时间', dataIndex: 'scGreenTime', valueType: 'digit' },
    { title: '黄灯时间', dataIndex: 'scYellowTime', valueType: 'digit' },
    { title: '全红时间', dataIndex: 'scAllRedTime', valueType: 'digit' },
    { title: '绿闪时间', dataIndex: 'scFlashingGreenTime', valueType: 'digit' },
    { title: '人行方向', dataIndex: 'pedestrian', key: 'pedestrian', valueType: 'select', width: 120, valueEnum: POSITION_ALL },
    { title: '基准方向', dataIndex: 'scCoordinateDirection', key: 'scCoordinateDirection', valueType: 'select', valueEnum: POSITION_ALL },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    }
  ]
  const columns: any = [
    {
      title: '时间段',
      dataIndex: 'timeRange',
      key: 'timeRange',
      valueType: 'text',
    },
    {
      title: '方案编号',
      dataIndex: 'scControlPlanCode',
      key: 'scControlPlanCode',
      valueType: 'text',
    },
    {
      title: '相位差',
      dataIndex: 'scOffset',
      key: 'scOffset',
      valueType: 'digit',
    },
    {
      title: '总周期',
      dataIndex: 'scCycleTime',
      key: 'scCycleTime',
      valueType: 'digit',
    },
  ];

  const expandedRowRender = (props: any) => {

    return (
      <EditableProTable
        columns={childrenColumns}
        rowKey="id"
        value={childrenTableData}
        onChange={setchildrenTableData}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        maxLength={20}
        editable={{
          type: 'multiple',
          editableKeys: childrenEditableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setchildrenTableData(recordList);
          },
          onChange: setchildrenEditableKeys,
        }}
      />
    );
  };

  return (
    <>
      <EditableProTable<any>
        columns={columns}
        rowKey="id"
        value={tableData}
        onChange={setTableData}
        recordCreatorProps={false}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="save"
              onClick={() => {
                console.log(tableData, childrenTableData);
              }}
            >
              保存数据
            </Button>,
          ];
        }}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: [1],
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onValuesChange: (record, recordList) => {
            setTableData(recordList);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};
