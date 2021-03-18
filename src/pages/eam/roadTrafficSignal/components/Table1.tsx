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
    { title: '序号',  dataIndex: 'a1', },
    { title: '操作人',  dataIndex: 'a1', },
    { title: '操作账号',  dataIndex: 'a1', },
    { title: '操作',  dataIndex: 'a1', },
    { title: '事件',  dataIndex: 'a1', },
    { title: '事件',  dataIndex: 'a1', },
    { title: '状态',  dataIndex: 'a1', },
    { title: '时间',  dataIndex: 'a1', }
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