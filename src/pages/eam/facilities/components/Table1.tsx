import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import BaseApi from '@/utils/BaseApi';

const saveDataFormat: any[] = [
  {
    id: '1',
    commandingHeight: false,
    entranceExitDirection: '北',
    intEquipmentAttributeList: [
      {
        attributeName: '机动车灯名称',
        value: ''
      },
      {
        attributeName: '数量（套）',
        value: ''
      },
      {
        attributeName: '倒计时',
        value: ''
      },
      {
        attributeName: '数量',
        value: ''
      },
      {
        attributeName: '设备状态（选择）',
        value: ''
      },
    ],
    intEquipmentDescription: '123',
    intEquipmentType: '机动车灯'
  },
];

const pageDataFormat: any[] = [
  {
    intersectionId: "10",
    intEquipmentType: "机动车灯",
    onlyAttribute: [
      {
        id: "1",
        attributeName: "灯杆类型",
        value: "L型"
      },
      {
        id: "2",
        attributeName: "备注",
        value: "备注213"
      }
    ],
    intEquipmentList: [
      {
        id: "6",
        intEquipmentType: "机动车灯",
        entranceExitDirection: "北",
        commandingHeight: false,
        intEquipmentDescription: "备注123"
      },
      {
        id: "8",
        intEquipmentType: "机动车灯",
        entranceExitDirection: "北",
        commandingHeight: false,
        intEquipmentDescription: "备注123"
      }
    ],
    intEquipmentAttributeMap: {
      "6": [
        {
          id: "5",
          attributeName: "机动车灯名称",
          value: "全屏灯"
        },
        {
          id: "6",
          attributeName: '数量（套）',
          value: ''
        },
        {
          id: "7",
          attributeName: '倒计时',
          value: ''
        },
        {
          id: "8",
          attributeName: '数量',
          value: ''
        },
        {
          id: "9",
          attributeName: '设备状态（选择）',
          value: ''
        }
      ],
      "8": [
        {
          id: "11",
          attributeName: "机动车灯名称",
          value: "箭头灯"
        }
      ]
    }
  }
]

// 修改数据结构用以展示
const editDataStructure = (data: any) => {
  const newdata = JSON.parse(JSON.stringify(data))
  newdata[0].intEquipmentList.map((item: any) => {
    newdata[0].intEquipmentAttributeMap[item.id].map((item2: any) => {
      item[item2.attributeName] = item2.value
    })
    return item
  })
  return newdata[0].intEquipmentList
}

// 修改数据结构用以保存
const editDataSave = (obj: any) => {
  const newObj = JSON.parse(JSON.stringify(obj))
  const newArr: any = {
    commandingHeight: newObj.commandingHeight,
    entranceExitDirection: newObj.entranceExitDirection,
    intEquipmentDescription: newObj.intEquipmentDescription,
    intEquipmentType: newObj.intEquipmentType,
    intEquipmentAttributeList: []
  }
  const reg = new RegExp("[\u4E00-\u9FFF]","g");
  for(var key in newObj) {
    if(reg.test(key)){
      newArr.intEquipmentAttributeList.push({attributeName: key, value: newObj[key].toString()})
    }
  }
  return newArr
}

const save = (row: any) => {
  console.log(row)
  console.log(editDataSave(row))
}

export default (prop: any) => {
  const [intersectionId] = useState<string>(prop.intersectionId);
  const [editableKeys, setEditableRowKeys] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<any>(() => editDataStructure(pageDataFormat));
  const [summaryDefaultData, setSummaryDefaultData] = useState<any>(pageDataFormat[0].onlyAttribute);
  const summaryColumns: any =[
    {
      title: '',
      align: 'center',
      width: 150,
      dataIndex: 'attributeName',
      editable: false,
    },
    {
      title: '',
      align: 'center',
      dataIndex: 'value',
      editable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      render: (text: any, record: any, _: any, action: any) => [
        <a
          key="editable"
          onClick={() => {
            action.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ]
  const columns: any = [
    {
      title: '入口方向',
      width: 150,
      align: 'center',
      dataIndex: 'entranceExitDirection',
      editable: false,
      render: (value: any, row: any, index: any) => {
        const obj = {
          children: value,
          props: {} as any,
        };
        if (index === 0) {
          obj.props.rowSpan = 20;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      }
    },
    {
      title: '机动车灯名称',
      dataIndex: '机动车灯名称',
      editable: true,
    },
    {
      title: '数量（套）',
      dataIndex: '数量（套）',
      valueType: 'digit',
      editable: true,
    },
    {
      title: '倒计时',
      dataIndex: '倒计时',
      editable: true,
    },
    {
      title: '数量',
      valueType: 'digit',
      dataIndex: '数量',
      editable: true,
    },
    {
      title: '设备状态（选择）',
      dataIndex: '设备状态（选择）',
      editable: true,
      valueType: 'select',
      valueEnum: {
        '正常': { text: '正常'},
        '异常': { text: '异常'},
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      render: (text: any, record: any, _: any, action: any) => [
        <a
          key="editable"
          onClick={() => {
            action.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  useEffect(() => {
    
  }, [prop.entranceExitDirection])

  return (
    <>
      <EditableProTable<any>
        size="small"
        bordered={true}
        rowKey="id"
        headerTitle="机动车灯"
        maxLength={5}
        recordCreatorProps={false}
        columns={columns}
        request={async () => {
          // const params = {
          //   entranceExitDirection: prop.entranceExitDirection,
          //   intEquipmentTypeList: ["机动车灯"]
          // }
          // const msg = await BaseApi(`/api/biz/intersection/${intersectionId}/equipment/list`).post(params)
          // const newMsg = JSON.parse(JSON.stringify(msg))
          // if(newMsg.code === 0) {
          //   newMsg.data = newMsg.data.length > 0 ? editDataStructure(newMsg.data) : dataSource
          // } else {
          //   message.warning(newMsg.msg)
          // }
          return {
            data: [],
            success: true,
          }
        }}
        params={prop}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (key, row) => {
            save(row)
          },
          actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
          onChange: setEditableRowKeys,
        }}
      />
      <EditableProTable<any>
        style={{padding: '0 24px'}}
        showHeader={false}
        size="small"
        bordered={true}
        rowKey="id"
        recordCreatorProps={false}
        columns={summaryColumns}
        onChange={setSummaryDefaultData}
        request={async () => ({
          data: summaryDefaultData,
          success: true,
        })}
        params={prop}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (key, row) => {
            save(row)
          },
          actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};