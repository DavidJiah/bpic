import React from 'react';
import ProTable from '@ant-design/pro-table';
import { message, Popconfirm } from 'antd';
import './phase.less'

const SubPhaseTable: React.FC<any> = (props) => {
    const { subPhasescs, setEdit } = props;
    return (
      <ProTable
        columns={[
          { title: '相序代号', dataIndex: 'scDirectionCode', valueType: 'digit' },
          { title: '相位序号', dataIndex: 'scPhaseNumber', valueType: 'digit', width: 80, editable: false, },
          { title: '绿灯时间', dataIndex: 'scGreenTime', valueType: 'digit' },
          { title: '最短绿灯', dataIndex: 'scMinimumGreenTime', valueType: 'digit' },
          { title: '最长绿灯', dataIndex: 'scMaximumGreenTime', valueType: 'digit' },
          { title: '黄灯时间', dataIndex: 'scYellowTime', valueType: 'digit' },
          { title: '全红时间', dataIndex: 'scAllRedTime', valueType: 'digit' },
          { title: '绿闪时间', dataIndex: 'scFlashingGreenTime', valueType: 'digit' },
          { title: '行人红灯', dataIndex: 'scPedestrianRedTime', valueType: 'digit' },
          { title: '行闪时间', dataIndex: 'scPedestrianBlinkingTime', valueType: 'digit' },
          { title: '相位描述', dataIndex: 'scPhaseDescription' },
          { title: '流向描述', dataIndex: 'scDirectionDescription' },
          {
            title: '操作',
            valueType: 'option',
            render: (_, row: any) => [
              <a key="editable"
                onClick={ async () => {
                  if (setEdit) setEdit(row);
                }}
              >
                编辑
              </a>,
              <Popconfirm
                key="del"
                title="是否确定删除?"
                onConfirm={async () => {
                  // const msg = await deleteControlPlan(intersectionId, row.id);
                  const msg = { code: 0 };
                  if (msg.code === 0) message.success('删除成功');
                  else message.error('删除失败，请联系管理员');
                }}
              >
                <a> 删除 </a>
              </Popconfirm>,
            ],
          },
        ]}
        rowKey="scPhaseNumber"
        dataSource={subPhasescs}
        size="small"
        bordered={true}
        headerTitle={false}
        search={false}
        options={false}
        pagination={false}
      />
    );
}

export default SubPhaseTable;
