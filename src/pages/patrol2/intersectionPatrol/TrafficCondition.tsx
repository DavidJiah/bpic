import React, { useState } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Button } from 'antd';
import moment from 'moment';

const defaultData = [
  {
    id: 1,
    flowDirection: '北左',
    scGreenTime: 5,
    describe: '0次排队',
    childrenData: [{
      id: 1,
      GreenStopTime: moment(new Date),
      pass: "2",
      queueUp: 2
    }]
  },
  {
    id: 2,
    flowDirection: '北直',
    scGreenTime: 5,
    describe: '',
  },
  {
    id: 3,
    flowDirection: '南左',
    scGreenTime: 5,
    describe: '',
  },
  {
    id: 4,
    flowDirection: '南直',
    scGreenTime: 5,
    describe: '',
  },
  {
    id: 5,
    flowDirection: '东左',
    scGreenTime: 5,
    describe: '',
  },
  {
    id: 6,
    flowDirection: '东直',
    scGreenTime: 5,
    describe: '',
  },
  {
    id: 7,
    flowDirection: '西左',
    scGreenTime: 5,
    describe: '',
  },
  {
    id: 8,
    flowDirection: '西直',
    scGreenTime: 5,
    describe: '',
  },
];

export default (props: any) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [childrenEditableKeys, setchildrenEditableKeys] = useState<React.Key[]>(() => {
    let arr: any = []
    defaultData?.map((item: any) => {
      item.childrenData?.map((item2: any) => {
        arr.push(item2?.id)
      })
    })
    return arr
  });
  const [tableData, setTableData] = useState<any[]>(() => defaultData);
  const [childrenTableData, setchildrenTableData] = useState<any[]>();

  const childrenColumns: any = [
    { title: '绿灯终止时刻（必填）', dataIndex: 'GreenStopTime', valueType: 'time' },
    { title: '放行（pcu/（C*ln）', dataIndex: 'pass', valueType: 'digit', editable: true },
    { title: '排队（pcu/（C*ln）', dataIndex: 'queueUp', valueType: 'digit' },
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
      title: '流向',
      dataIndex: 'flowDirection',
      key: 'flowDirection',
      valueType: 'text',
      width: '120'
    },
    {
      title: '绿灯时长',
      dataIndex: 'scGreenTime',
      key: 'scGreenTime',
      valueType: 'digit',
      width: '120'
    },
    {
      title: '描述',
      dataIndex: 'describe',
      key: 'describe',
      valueType: 'text',
    },
  ];

  const expandedRowRender = (props: any) => {

    const setdata = (value: any) => {
      tableData.map((item: any) => (item.id === props?.id && (item.childrenData = value)))
      setTableData(tableData)
    }

    const deteleChildrenData = (row: any) => {
      console.log(row)
    }

    return (
      <EditableProTable
        columns={childrenColumns}
        rowKey="id"
        onChange={setdata}
        params={props.childrenData}
        request={async (params) => {
          return {
            data: props.childrenData,
            success: true,
          }
        }}
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
            return [
              <a onClick={() => deteleChildrenData(row)}>
                删除
              </a>
            ];
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
