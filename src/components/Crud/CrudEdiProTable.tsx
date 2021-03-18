import React, { Component } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { message,Popconfirm } from 'antd';
import type { PageInfo } from './data';
import BaseApi from './BaseApi';

type IProColumns = Partial<ProColumns> & {};


interface Props {
    columns: IProColumns[];
    api: string;
    rowKey?: string;
    tableProps: any;
}
 
class CrudEdiProTable extends Component<Props> {
  
    state = {
        editableKeys: undefined,
        dataSource: [],
        newRecord: {}
    }
    

    operation() {
        const {handleDelete} = this
        const {api,rowKey} = this.props
        return {
            title: '操作',
            fixed: 'right',
            width: 160,
            valueType: 'option',
            align: 'center',
            render: (text, record, _, action) => [
                <a
                    key="edit"
                    onClick={() => {
                        action.startEditable?.(record.id);
                    }}
                >
                    编辑
                </a>,
                 <Popconfirm key="del" title="是否确定删除?" onConfirm={() => {
                    handleDelete(action,record[rowKey],api)
                 }}>
                <a> 删除 </a> 
               </Popconfirm>,
            ],
        }
    }
    
     handleDelete=async (action: any,id: any,api: string)=>{  
        const msg = await BaseApi(api).removeById(id)
        if (msg.code === 0){
            message.success('删除成功，即将刷新');
            action.reload()
        }else{
            message.error('删除失败，请联系管理员')
        }
    }
    messageInfo(msg: any){
        if (msg.code === 0)
            message.success('操作成功，即将刷新');
        else
            message.error('操作失败，请联系管理员')
    }

    render() { 
        const { messageInfo} = this
        const { api, columns,rowKey ,tableProps} = this.props
        const { editableKeys, newRecord } = this.state
        return (
            <>
                <EditableProTable<any>
                    {...tableProps}
                    size="small"
                    rowKey="id"
                    recordCreatorProps={{ position: 'bottom', record: newRecord }}
                    columns={columns.concat(this.operation())}
                    request={async (params, sorter, filter) => {
                        
                        console.log(params, sorter, filter);
                        const newParams: PageInfo = { size: params.pageSize, current:params.current }
                        const msg = await BaseApi(api).page(newParams); 
                        return {
                            data: msg.data.records,
                            success: true,
                            total: msg.data.total,
                        };
                    }}
                    editable={{
                        type: 'single',
                        editableKeys,
                        onSave: async (key,row) => {
                            if(row[rowKey]){
                                const msg = await BaseApi(api).update(row[rowKey], row)
                                messageInfo(msg)
                            }else{
                                const msg = await BaseApi(api).save(row)
                                messageInfo(msg)
                            } 
                        },
                        onChange: (_editableKeys) => {
                            this.setState({ editableKeys:_editableKeys })
                        },
                        actionRender: (row, config, dom) => [dom.save, dom.cancel],
                    }}
                />
            </>
        );
    }
}
export default CrudEdiProTable
