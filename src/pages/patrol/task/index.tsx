/*
 * @Author: Dad
 * @Date: 2021-03-09 11:17:52
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-25 19:30:06
 */
import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Dispatch, AnyAction } from 'redux';
import {
  Button,
  Col,
  Row,
  Form,
  Select,
  Table,
  message,
  Dropdown,
  Menu,
  Space,
  Popconfirm,
  Pagination,
} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { fetchList, getIntersectionInfo, deleteOrder, distributeTask } from './service';
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE, USER_ENGINEER } from '@/const';
import ModalForm from './ModalForm';
import _ from 'lodash';
import style from './index.less';
import moment from 'moment';

interface CompProps {
  dispatch: Dispatch<AnyAction>;
  loading: boolean;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const Day = 'YYYY-MM-DD'

const PatrolTask: React.FC<CompProps> = ({ dispatch, loading }) => {
  const [form] = Form.useForm();
  const [list, setList] = useState<any>([]);
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
    initList();
  }, [currPage, pageSize]);

  // 二级下拉Table
  const expandedRowRender = (prors: any) => {
    const columns = [
      {
        title: '巡检路口',
        key: 'intIntersectionName',
        render: (item: any) => (
          <div>
            {item?.intIntersectionName}({item?.intIntersectionId})
          </div>
        ),
      },
      {
        title: '巡检完成次数',
        dataIndex: 'publicSentimentType',
        key: 'publicSentimentType',
      },
    ];

    return <Table rowKey="id" columns={columns} dataSource={prors?.engineerScheduleItemDTO} pagination={false} />;
  };

  /**
   * @name: 获取所有路口信息
   */
  const getIntersectionList = async () => {
    try {
      const { code, data, msg } = await getIntersectionInfo();
      if (code == 0) setIntersectionList(data);
      else message.error(msg);
    } catch (error) { }
  };

  /**
   * @name: 列表加载
   */
  const initList = async () => {
    const param = form?.getFieldsValue();
    const { code, data, msg } = await fetchList({
      current: currPage,
      size: pageSize,
      template: { ...param },
    });
    const list = _.map(data?.records, (item: any) => ({
      ...item?.patrolSchedule,
      engineerScheduleItemDTO: item?.engineerScheduleItemDTO,
      dateRange: `${moment(item?.patrolSchedule.inspScheduleBeginDate).format(Day)} ~ ${moment(item?.patrolSchedule.inspScheduleEndDate).format(Day)}`
    }))
    if (code === 0) setList(list);
    else message.error(msg);
  };

  const handleEidt = (param: any) => {
    setModalType('编辑');
    setmodalVisible(true);
    setRowData(param);
  };

  const handleDetele = async (param: any) => {
    const { code, msg } = await deleteOrder(param.id);
    if (code === 0) message.success('删除成功'), initList();
    else message.error(msg);
  };

  const sendTask = async (record: any) => {
    const { code, msg } = await distributeTask(record.id, USER_ENGINEER);
    if (code === 0) message.success('派单成功'), initList();
    else message.error(msg);
  }

  //Table ... 操作栏
  const menu = (data: any) => {
    return (
      <Menu>
        {!data?.inspScheduleAllocationTime && (<>
          <Menu.Item key="2" onClick={() => handleEidt(data)}>
            编辑
          </Menu.Item>
          <Menu.Item key="3">
            <Popconfirm title="是否确认删除?" onConfirm={() => handleDetele(data)}>
              删除
            </Popconfirm>
          </Menu.Item>
        </>)}
      </Menu>
    );
  };

  const columns: any = [
    {
      title: '创建日期',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (item: any) => item ? moment(item).format('YYYY-MM-DD') : null,
    },
    {
      title: '巡检路口总数',
      key: 'inspScheduleCount',
      dataIndex: 'inspScheduleCount',
    },
    {
      title: '巡检负责人',
      dataIndex: 'inspScheduleInspector',
      key: 'inspScheduleInspector',
    },
    {
      title: '完成时段',
      dataIndex: 'dateRange',
      key: 'dateRange',
    },
    {
      title: '派单时间',
      dataIndex: 'inspScheduleAllocationTime',
      key: 'inspScheduleAllocationTime',
      render: (item: any) => item ? moment(item).format('YYYY-MM-DD') : null,
    },
    {
      width: 80,
      render: (text: any, record: any) => {
        if (!record?.inspScheduleAllocationTime) {
          return (<><a onClick={() => sendTask(record)}>派单</a></>)
        } else {
          return null
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'name',
      key: 'id',
      align: 'center',
      render: (text: any, record: any) => (
        <Space>
          <Dropdown overlay={menu(record)}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
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
          <Col span={2}>
            <Button
              type="primary"
              shape="round"
              onClick={() => {
                setmodalVisible(true), setModalType('新增');
              }}
            >
              新增巡检单
            </Button>
          </Col>
          <Col span={6}>
            <Form.Item {...layout} label="路口名称" name="correlateIntersection">
              <Select placeholder="全部">
                {_.map(intersectionList, (item: any) => (
                  <Select.Option key={item?.intersectionCode} value={item?.intersectionName}>
                    {item?.intersectionName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Space>
              <Button type="primary" onClick={() => initList()}>
                确认
              </Button>
              <Button onClick={() => form.resetFields()}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <div className={style.table}>
        <Table
          columns={columns}
          dataSource={list}
          rowKey="id"
          expandable={{ expandedRowRender }}
          pagination={false}
        />
        <div className="global-pagination">
          <Pagination
            showQuickJumper
            defaultCurrent={currPage}
            total={list?.length}
            onChange={(val: number, pageSize?: number) => {
              setCurrPage(val), pageSize ? setPageSize(pageSize) : null;
            }}
          />
        </div>
      </div>
      <ModalForm
        modalVisible={modalVisible}
        initList={initList}
        onCancel={() => setmodalVisible(false)}
        ModalType={modalType}
        editData={rowData}
      />
    </div>
  );
};

export default connect(({ loading }: any) => ({
  loading: loading.effects['productManagerList/fetchList'],
}))(PatrolTask);
