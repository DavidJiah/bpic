import React from 'react';
import ProTable from '@ant-design/pro-table';
import './phase.less'
import _ from 'lodash';

const SubPhaseTable: React.FC<any> = (props) => {
    const {subPhasescs,updatePhases,editableKeys} = props
    return ( 
    <ProTable
        columns={[  
          { title: '相序代号', dataIndex: 'scDirectionCode',valueType:'digit' },
          { title: '相位序号', dataIndex: 'scPhaseNumber',valueType:'digit',width:80,editable:false },
          { title: '绿灯时间', dataIndex: 'scGreenTime',valueType:'digit' },
          { title: '最短绿灯', dataIndex: 'scMinimumGreenTime',valueType:'digit' },
          { title: '最长绿灯', dataIndex: 'scMaximumGreenTime',valueType:'digit' },
          { title: '黄灯时间', dataIndex: 'scYellowTime',valueType:'digit' },
          { title: '全红时间', dataIndex: 'scAllRedTime',valueType:'digit' },
          { title: '绿闪时间', dataIndex: 'scFlashingGreenTime',valueType:'digit' },
          { title: '行人红灯', dataIndex: 'scPedestrianRedTime',valueType:'digit' },
          { title: '行闪时间', dataIndex: 'scPedestrianBlinkingTime',valueType:'digit' },
          { title: '相位描述', dataIndex: 'scPhaseDescription' },
          { title: '流向描述', dataIndex: 'scDirectionDescription' }
        ]} 
        dataSource={subPhasescs}
        editable={{
            type: 'multiple',
            editableKeys,
            onValuesChange: (record )=>{
              const tlist = subPhasescs.map((item: any)=>{ 
                return record.scPhaseNumber===item.scPhaseNumber?_.merge(item,record):item
              })
              updatePhases(tlist)
            }
          }}
        rowKey="scPhaseNumber" 
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
