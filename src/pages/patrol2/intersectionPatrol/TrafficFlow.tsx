import React, { useState, useRef, useEffect } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, Row, Col } from 'antd';
import Draw from '@/pages/eam/flow/components/canvas.js';

const defaultData: any[] = [
  {
    id: 1,
    entranceExitDirection: '北',
    uturnVolume: 0,
    leftTurnVolume: 10,
    straightVolume: 20,
    rightTurnVolume: 30
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

export default (props: any) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [tableData, setTableData] = useState<any[]>(() => defaultData);
  const canvasbox = useRef(null);

  useEffect(() => {
    Draw({
      el: canvasbox.current,
      carVal: defaultData,
      maxLineWidth: 30,
      thresholdVal: 500
    })
  }, [props])

  const columns: any = [
    { title: '方位', dataIndex: 'entranceExitDirection', key: 'entranceExitDirection', width: '20%' },
    { title: '掉头', dataIndex: 'uturnVolume', key: 'uturnVolume', valueType: 'digit', width: '20%' },
    { title: '左转', dataIndex: 'leftTurnVolume', key: 'leftTurnVolume', valueType: 'digit', width: '20%' },
    { title: '直行', dataIndex: 'straightVolume', key: 'straightVolume', valueType: 'digit', width: '20%' },
    { title: '右转', dataIndex: 'rightTurnVolume', key: 'rightTurnVolume', valueType: 'digit', width: '20%' },
  ]

  return (
    <>
      <Row gutter={[30, 0]}>
        <Col span={8}>
          <div
            ref={canvasbox}
            style={{ width: '220px', height: '220px', background: '#141414', padding: '10px', boxSizing: 'content-box' }}
          />
        </Col>
        <Col span={16}>
          <EditableProTable<any>
            size="small"
            bordered={true}
            rowKey="id"
            maxLength={4}
            recordCreatorProps={false}
            columns={columns}
            toolBarRender={() => {
              return [
                <Button
                  type="primary"
                  key="save"
                  onClick={() => {
                    console.log(tableData);
                  }}
                >
                  保存数据
                </Button>,
              ];
            }}
            request={async () => ({
              data: tableData,
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
        </Col>
      </Row>
    </>
  );
};
