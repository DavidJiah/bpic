import React, { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Button, message } from 'antd';
import { TableDropdown } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import ModalForm from './ModalForm';
import type { PageInfo } from './data';
import BaseApi from './BaseApi';

type IProColumns = Partial<ProColumns> & {
    inputProps?: any;
    hideDetail?: false;
    hideFrom?: false;
};


interface Props {
    tableProps?: any,
    formProps?: any;
    columns: IProColumns<any>[];
    api: any;
    rowKey?: 'id';
}


class CrudProTable extends Component<Props> {
    state = {
        actionRef: [],
        modalVisible: false,
        detailVisible: false,
        modalType: 'add',
        modalTitle: '新增',
        row: null,
        initialValues: {},
        fcolumns: [],
        dcolumns: [],
        tcolumns: []
    }
    constructor(props: Props) {
        super(props);
        const { columns } = props

        const tcolumns = columns.concat(this.getOperation())

        const fcolumns = columns.filter(e => !e.hideFrom && !['index', 'indexBorder', 'progress', 'digit', 'percent', 'code', 'avatar', 'password', 'option'].includes(e.valueType)).map(item => {
            return { inputProps: item.inputProps, valueEnum: item.valueEnum, title: item.title, dataIndex: item.dataIndex, span: item.span || '12', valueType: item.valueType, rules: item.rules }
        })
        const dcolumns = columns.filter(e => !e.hideDetail && !['operation', 'id'].includes(e.key)).map(item => {
            return { title: item.title, valueType: item.valueType, dataIndex: item.dataIndex, valueEnum: item.valueEnum, render: item.renderDes }
        })
        this.state = { fcolumns, dcolumns, tcolumns }
    }
    /**
    *  编辑
    *  @param fields
    */
    handleUpdate = async (fields: any) => {

        this.setState({
            modalTitle: '编辑',
            modalType: 'edit',
            modalVisible: true,
            initialValues: fields
        })
    };

    messageInfo = (msg: any) => {
        if (msg.code === 0)
            message.success('操作成功，即将刷新');
        else
            message.error('操作失败，请联系管理员')
    }
    /**
     *  删除
     *  @param fields
     */
    handleDelete = async (action,fields: any) => {
        const { messageInfo } = this
        const { api, rowKey } = this.props
        if (!fields) return true;

        Modal.confirm({
            title: '删除',
            content: '是否确定删除?',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                const hide = message.loading('正在删除');
                try {
                    const msg = await BaseApi(api).removeById(fields[rowKey]);
                    hide();
                    if (msg.code === 0){
                        message.success('删除成功，即将刷新');
                        action.reload()
                    }else{
                        message.error('操作失败，请联系管理员')
                    }    
                } catch (error) {
                    hide();
                    return false;
                }
            },
        });

    };

    /**
     *  复制
     * @param fields
     */
    handleCopy = async (fields: any) => {
        this.setState({
            modalTitle: '复制',
            modalType: 'copy',
            modalVisible: true,
            initialValues: fields
        })
    };

    /**
     *  新增
     * @param  
     */
    handleAdd = async () => {
        this.setState({
            modalTitle: '新增',
            modalType: 'add',
            modalVisible: true,
            initialValues: {}
        })
    };
    /**
      *  详情
      * @param  
      */
    handleView = (fields: any) => {
        this.setState({
            row: fields,
            detailVisible: true
        })
    };
    /**
     * 操作栏
     * 
     */

    getOperation() {
        const { handleView, handleUpdate, handleDelete, handleCopy } = this
        return {
            key: 'operation',
            fixed: 'right',
            width: 60,
            title: '操作',
            valueType: 'option',
            align: 'center',
            render: (text, record, _, action) => [
                <TableDropdown
                    key="actionGroup"
                    onSelect={(e) => {
                        const fields = JSON.parse(JSON.stringify(record))
                        if (e === 'view') {
                            handleView(fields)
                        } else if (e === 'edit') {
                            handleUpdate(fields)
                        } else if (e === 'copy') {
                            handleCopy(fields)
                        } else if (e === 'delete') {
                            handleDelete(action,fields)
                        }
                    }}
                    menus={[
                        { key: 'view', name: '查看' },
                        { key: 'edit', name: '编辑' },
                        { key: 'copy', name: '复制' },
                        { key: 'delete', name: '删除' },
                    ]}
                />,
            ],
        }
    }

    render() {
        const { dcolumns, tcolumns, fcolumns, row, modalType, modalTitle, modalVisible, detailVisible, initialValues, actionRef } = this.state
        const { api, tableProps, formProps, rowKey } = this.props
        const modalWidth = formProps && formProps.modalWidth ? formProps.modalWidth : '45%'
        return (
            <>
                <ProTable<any>
                    actionRef={actionRef}
                    {...tableProps}
                    toolBarRender={() => [
                        <Button type="dashed" onClick={this.handleAdd}><PlusOutlined /> 新建 </Button>,
                    ]}
                    request={async (params, sort) => {

                        const orderBy = Object.keys(sort).map(item => {
                            return { column: item, asc: (sort[item] === 'ascend') }
                        })

                        const { pageSize, current } = params
                        const newParams: PageInfo = { size: pageSize, current }

                        if (orderBy.length >= 1) {
                            newParams.orderBy = orderBy
                        }

                        const msg = await BaseApi(api).page(newParams);
                        return {
                            data: msg.data.records,
                            success: true,
                            total: msg.data.total,
                        };
                    }}
                    rowKey={rowKey}
                    options={{ fullScreen: true, reload: true, setting: true }}
                    columns={tcolumns}
                />
                {modalVisible && <ModalForm
                    title={modalTitle}
                    type={modalType}
                    api={api}
                    rowKey={rowKey}
                    columns={fcolumns}
                    modalWidth={modalWidth}
                    formProps={formProps}
                    reload={() => { actionRef.current.reload() }}
                    onCancel={() => {
                        this.setState({ modalVisible: false })
                    }}
                    initialValues={initialValues}
                    modalVisible={modalVisible}
                />}
                {detailVisible && <Modal
                    centered
                    title='详情'
                    visible={detailVisible}
                    width={modalWidth}
                    footer={false}
                    onCancel={() => this.setState({ detailVisible: false })}
                >
                    <ProDescriptions<any>
                        column={2}
                        request={async () => ({
                            data: row || {},
                        })}
                        columns={dcolumns}
                    />
                </Modal>}
            </>
        );
    }

}
export default CrudProTable