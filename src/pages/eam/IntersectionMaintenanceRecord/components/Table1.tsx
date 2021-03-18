import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
type DataSourceType = {
  a1: string;
  a2: string;
  a3: string;
  a4: string;
  a5: string;
  a6: string;
  a7: string;
};
const defaultData: DataSourceType[] = [
  {},
  {},
];
export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [setNewRecord] = useState({
    id: (Math.random() * 1000000).toFixed(0),
  });
   
  
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '入口方向（选择）',
      dataIndex: 'a1',
    },
    {
      title: '机动车灯名称',
      dataIndex: 'a2',
    },
    {
      title: '数量（套）',
      dataIndex: 'a3',
    },
    {
      title: '倒计时',
      dataIndex: 'a4',
    },
    {
      title: '数量',
      dataIndex: 'a5',
    },
    {
      title: '设备状态（选择）',
      dataIndex: 'a6',
    },
    {
      title: '状态',
      dataIndex: 'a7',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action.startEditable?.(record.a1);
          }}
        >
          编辑
        </a>
      ],
    },
  ];
  return (
    <>
      <EditableProTable<DataSourceType>
        size="small"
        bordered={true}
        rowKey="id"
        headerTitle="机动车灯"
        maxLength={5}
        recordCreatorProps={false}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async () => {
            await waitTime(2000);
            setNewRecord({
              id: (Math.random() * 1000000).toFixed(0),
            });
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};