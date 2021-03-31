/*
 * @Author: Dad
 * @Date: 2021-03-09 11:17:52
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-09 13:56:08
 */
import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Dispatch, AnyAction } from 'redux';
import { Button, Col, Row, Form, Select, Table, message, Dropdown, Menu, Space, Pagination } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { getpages, getIntersectionInfo } from './service'
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@/const'
import ModalForm from './ModalForm'
import _ from 'lodash';
import moment from 'moment';
import style from './index.less';

interface CompProps {
  dispatch: Dispatch<AnyAction>;
  loading: boolean;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const PatrolTask: React.FC<CompProps> = ({ dispatch, loading }) => {
  const [form] = Form.useForm();
  const [TableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState(DEFAULT_PAGE_NUM);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [modalVisible, setmodalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('look');
  const [rowData, setRowData] = useState<object>({});
  const [intersectionList, setIntersectionList] = useState<any>([]);


  useEffect(() => {
    getIntersectionList();
  }, []);

  useEffect(() => {
    initList()
  }, [currPage, pageSize]);

  /**
  * @name: 获取所有路口信息
  */
  const getIntersectionList = async () => {
    try {
      const { code, data, msg } = await getIntersectionInfo();
      if (code == 0) setIntersectionList(data)
      else message.error(msg)
    } catch (error) { }
  };

  /**
   * @name: 列表加载
   */
  const initList = async () => {
    const param = form?.getFieldsValue();
    const { code, data, msg } = await getpages({ current: currPage, size: pageSize, template: { ...param } })
    if (code === 0) setTableData(data?.records.map((item: any) => item.dailyTask))
    else message.success(msg)
  }

  const menu = (data: any) => {
    return (
      <Menu>
        <Menu.Item key="1" onClick={() => { history.push({ pathname: '/patrol/AuditReport', query: { id: data.id, type: 'look' } }) }}>查看</Menu.Item>
      </Menu>
    )
  };

  const columns = [
    {
      title: '创建日期',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (item: any) => moment(item).format("YYYY-MM-DD")
    },
    {
      title: '巡检路口总数',
      dataIndex: 'publicSentimentType',
      key: 'publicSentimentType',
    },
    {
      title: '巡检负责人',
      dataIndex: 'inspScheduleInspector',
      key: 'inspScheduleInspector',
    },
    {
      title: '异常路口总数',
      dataIndex: 'CompletionTime',
      key: 'CompletionTime',
    },
    {
      title: '路径巡检数',
      dataIndex: 'inspScheduleAllocationTime',
      key: 'inspScheduleAllocationTime',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '操作',
      dataIndex: 'name',
      key: 'id',
      width: '300px',
      render: (text: any, record: any) => (
        <Space>
          <a onClick={() => {}}>提交审核</a>
          <a onClick={() => {}}>重新提交</a>
          <Dropdown overlay={menu(record)}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <EllipsisOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Form {...layout} name="formList" form={form} initialValues={{ remember: true }}>
        <Row>
          <Col span={6}>
            <Form.Item {...layout} label="路口名称" name="correlateIntersection">
              <Select placeholder="全部">
                {_.map(intersectionList, (item: any,) => (
                  <Select.Option key={item?.intersectionCode} value={item?.intersectionName}>
                    {item?.intersectionName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Space>
              <Button type="primary" onClick={() => initList()}>确认</Button>
              <Button onClick={() => form.resetFields()}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <div className={style.table}>
        <Table columns={columns} dataSource={TableData} rowKey='id' pagination={false} />
        <div className="global-pagination" >
          <Pagination showQuickJumper defaultCurrent={currPage} total={TableData?.length} onChange={(val: number, pageSize?: number) => {setCurrPage(val),pageSize?setPageSize(pageSize):null}} />
        </div>
      </div>
      <ModalForm modalVisible={modalVisible} initList={initList} onCancel={() => setmodalVisible(false)} ModalType={modalType} editData={rowData} />
    </div >
  )
}

export default connect(({ loading }: any) => ({
  loading: loading.effects['productManagerList/fetchList'],
}))(PatrolTask);