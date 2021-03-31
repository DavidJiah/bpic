/*
 * @Author: Dad
 * @Date: 2021-03-09 11:17:52
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-09 13:56:08
 */
import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Dispatch, AnyAction } from 'redux';
import { Form, Table, message, Space, Pagination } from 'antd';
import { fetchList } from './service'
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@/const'
import _ from 'lodash';
import style from './index.less';
import moment from 'moment';

interface CompProps {
  dispatch: Dispatch<AnyAction>;
  loading: boolean;
}

const Day = 'YYYY-MM-DD'

const PatrolTask: React.FC<CompProps> = ({ dispatch, loading }) => {
  const [form] = Form.useForm();
  const [TableData, setTableData] = useState<any>([]);
  const [currPage, setCurrPage] = useState(DEFAULT_PAGE_NUM);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  useEffect(() => {
    initList()
  }, [currPage, pageSize]);

  const expandedRowRender = () => {
    const columns = [
      {
        title: '巡检路口',
        dataIndex: 'intIntersectionName',
        key: 'intIntersectionName',
      },
      {
        title: '巡检完成次数',
        dataIndex: 'publicSentimentType',
        key: 'publicSentimentType',
      }
    ];

    return <Table rowKey='id' columns={columns} dataSource={[]} pagination={false} />
  }

  const createInventory = (record: any) => {
    sessionStorage.setItem('list', JSON.stringify(record?.patrolScheduleIntersectionList))
    history.push({pathname: '/patrol2/intersectionPatrolList', query: {patrolScheduleId: record?.id}})
  }

  /**
   * @name: 列表加载
   */
  const initList = async () => {
    const param = form?.getFieldsValue();
    const { code, data, msg } = await fetchList({ current: currPage, size: pageSize, template: { ...param } })
    const list = _.map(data?.records, (item: any) => ({
      ...item?.patrolSchedule,
      engineerScheduleItemDTO: item?.engineerScheduleItemDTO,
      patrolScheduleIntersectionList: item?.patrolScheduleIntersectionList,
      dateRange: `${moment(item?.patrolSchedule.inspScheduleBeginDate).format(Day)} ~ ${moment(item?.patrolSchedule.inspScheduleEndDate).format(Day)}`
    }))
    if (code === 0) setTableData(list)
    else message.success(msg)
  }

  const columns: any = [
    {
      title: '创建日期',
      dataIndex: 'createTime',
      render: (item: any) => item ? moment(item).format('YYYY-MM-DD') : null,
    },
    {
      title: '巡检路口总数',
      dataIndex: 'inspScheduleCount',
      // align: 'center'
    },
    {
      title: '完成时段',
      dataIndex: 'dateRange',
    },
    {
      title: '派单时间',
      dataIndex: 'inspScheduleAllocationTime',
      render: (item: any) => item ? moment(item).format('YYYY-MM-DD') : null,
    },
    {
      title: '操作',
      dataIndex: 'name',
      key: 'id',
      width: '300px',
      render: (text: any, record: any) => (
        <Space>
          {record?.intersectionGroup ? <a onClick={() => { }}>查看周计划</a> : <a onClick={() => { }}>创建周计划</a>}
          <a onClick={() => createInventory(record)}>创建当天巡检清单</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className={style.table}>
        <Table columns={columns} dataSource={TableData} rowKey='id' expandable={{ expandedRowRender }} pagination={false} />
        <div className="global-pagination" >
          <Pagination showQuickJumper defaultCurrent={currPage} total={TableData?.length} onChange={(val: number, pageSize?: number) => { setCurrPage(val), pageSize ? setPageSize(pageSize) : null }} />
        </div>
      </div>
    </div>
  )
}

export default connect(({ loading }: any) => ({
  loading: loading.effects['productManagerList/fetchList'],
}))(PatrolTask);