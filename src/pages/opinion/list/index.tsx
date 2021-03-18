/*
 * @Author: Dad
 * @Date: 2021-03-09 11:17:52
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-09 13:56:08
 */
import React, { useState, useEffect, useRef } from 'react';
import { connect, history } from 'umi';
import { Dispatch, AnyAction } from 'redux';
import { Button, Col, Row, Form, Select, DatePicker, Table, message, Dropdown, Menu, Space, Popconfirm, Pagination } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import FormModal from '../components/creatModel'
import style from './index.less';
import { getIntersectionInfo, getpages, Delete } from './service'
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE, OPINION_TYPE } from '@/const'
import _ from 'lodash';
import moment from 'moment';

const { Option } = Select;

interface CompProps {
  dispatch: Dispatch<AnyAction>;
  loading: boolean;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const Comp: React.FC<CompProps> = ({ dispatch, loading }) => {
  const [form] = Form.useForm();
  const [TableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState(DEFAULT_PAGE_NUM);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [modalVisible, setmodalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('look');
  const [rowData, setRowData] = useState<object>({});
  const [list, setList] = useState<any>([]);


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
      if (code == 0) setList(data)
      else message.error(msg)
    } catch (error) { }
  };

  /**
   * @name: 列表加载
   */
  const initList = async () => {
    const param = form?.getFieldsValue();
    const { code, data, msg } = await getpages({ current: currPage, size: pageSize, template: { ...param } })
    if (code === 0) {
      setTableData(data.records)
    } else { message.success(msg) }
  }

  const pushreply = (param: any) => {
    console.log(param)
  }

  const handleEidt = (param: any) => {
    setModalType('编辑')
    setmodalVisible(true)
    setRowData(param)
  }

  const handleDetele = async (param: any) => {
    const { code, msg } = await Delete(param.id)
    if (code === 0) message.success('删除成功'), initList()
    else message.warning(msg)
  }

  const menu = (data: any) => {
    return (
      <Menu>
        <Menu.Item key="1" onClick={() => { history.push({ pathname: '/opinion/detail', query: { id: data.id, type: 'look' } }) }}>查看</Menu.Item>
        <Menu.Item key="2" onClick={() => handleEidt(data)}>编辑</Menu.Item>
        <Menu.Item key="3">
          <Popconfirm title="是否确认删除?" onConfirm={() => handleDetele(data)}>
            删除
          </Popconfirm>
        </Menu.Item>
      </Menu>
    )
  };

  const columns = [
    {
      title: '路口名称',
      dataIndex: 'correlateIntersection',
      key: 'correlateIntersection',
    },
    {
      title: '类型',
      dataIndex: 'publicSentimentType',
      key: 'publicSentimentType',
    },
    {
      title: '处理人',
      dataIndex: 'updateBy',
      key: 'updateBy',
    },
    {
      title: '接单时间',
      dataIndex: 'takingTime',
      key: 'takingTime',
      valueType: 'date',
      render: (item: any) => moment(item).format("YYYY-MM-DD")
    },
    {
      title: '状态',
      dataIndex: 'feedBackStatus',
      key: 'feedBackStatus',
    },
    {
      title: '回复时间',
      dataIndex: 'feedBackTime',
      key: 'feedBackTime',
      valueType: 'date'
    },
    {
      title: '操作',
      dataIndex: 'name',
      key: 'id',
      width: '150px',
      render: (text: any, record: any) => (
        <Space>
          <a onClick={() => { history.push({ pathname: '/opinion/detail', query: { id: record.id, type: 'edit' } }) }}>回复</a>
          <a onClick={() => pushreply(record)}>发布</a>
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
          <Col span={2}><Button type="primary" shape="round" onClick={() => { setmodalVisible(true), setModalType('新增流量') }}>新增舆情</Button></Col>
          <Col span={4}>
            <Form.Item {...layout} label="路口名称" name="correlateIntersection">
              <Select placeholder="全部">
                {_.map(list, (item: any,) => (
                  <Select.Option key={item?.intersectionCode} value={item?.intersectionName}>
                    {item?.intersectionName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item {...layout} label="舆情类型" name="publicSentimentType">
              <Select placeholder="全部">
                {
                  OPINION_TYPE.map((item: any) => (
                    <Option key={item?.key} value={item?.value}>
                      {item?.value}
                    </Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item {...layout} label="处理状态" name="feedBackStatus">
              <Select placeholder="全部">
                <Option value="待回复">待回复</Option>
                <Option value="未处理">未处理</Option>
                <Option value="已处理">已处理</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item {...layout} label="接单时间范围" name="feedBackTime">
              <DatePicker.RangePicker />
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
      <FormModal modalVisible={modalVisible} initList={initList} onCancel={() => setmodalVisible(false)} ModalType={modalType} editData={rowData} />
    </div >
  )
}

export default connect(({ loading }: any) => ({
  loading: loading.effects['productManagerList/fetchList'],
}))(Comp);