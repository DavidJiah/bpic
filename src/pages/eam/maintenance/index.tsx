import React, { useState, useEffect } from 'react';
import { Form, message, Row, Col, Pagination, Table, Select, Button, DatePicker } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import RoadTree from '@/components/Intersection/RoadTree';
import styles from './style.less';
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE, TYPE_ALL, AREASHAPEList, YEAR_FORMAT } from '@/const';
import _ from 'lodash';
import { getIntersectionInfo } from '../intersection/service';
import { connect } from 'umi';
import moment from 'moment';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const Maintenance: React.FC<any> = ({ dispatch, tableList, loading }) => {
  const [form] = Form.useForm();
  const [list, setList] = useState<any>([]);
  const [currPage, setCurrPage] = useState(DEFAULT_PAGE_NUM);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [intersectionId, setIntersectionId] = useState<string>();
  const [intersectionTitle, setIntersectionTitle] = useState<string>('请先选择路口');

  useEffect(() => {
    getIntersectionList();
  }, []);

  useEffect(() => {
    initList();
  }, [currPage, intersectionId]);

  const columns = [
    {
      title: '操作人',
      align: 'center',
      dataIndex: 'operatorName',
    },
    {
      title: '操作账号',
      align: 'center',
      dataIndex: 'operatorCode',
    },
    {
      title: '操作类型',
      align: 'center',
      dataIndex: 'actionType',
    },
    {
      title: '事件',
      align: 'center',
      dataIndex: 'actionDescription',
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'operatorResult',
    },
    {
      title: '时间',
      align: 'center',
      key: 'comDatetime',
      render: (item: any) => moment(item).format(YEAR_FORMAT),
    },
  ];

  // 点击树
  const onSelect = (selectedKeys: any, e: any) => {
    if (e.node.item1) {
      if (e.node.item1.intersectionId) {
        setIntersectionTitle(`${e.node.item1.trfcSlice}-${e.node.item1.intersectionName}`);
        setIntersectionId(e.node.item1.intersectionId);
      } else {
        message.warning('请先为该路口建档');
      }
    }
  };
  /**
   * @name: 获取所有路口信息
   */
  const getIntersectionList = async () => {
    try {
      const { code, data, msg } = await getIntersectionInfo();
      if (code == 0) setList(data);
      else message.error(msg);
    } catch (error) {}
  };

  /**
   * @name: 列表加载
   */
  const initList = () => {
    const data = form?.getFieldsValue();
    if (data?.intersection) delete data?.intersection;
    if (intersectionId) {
      dispatch({
        type: 'maintenance/fetchList',
        queryParams: {
          currPage,
          pageSize,
          intersectionId,
          template: JSON.stringify(data) == '{}' ? undefined : { ...data },
        },
      });
    }
  };

  /**
   * @name: 触发列表加载effect
   * @param {type}
   */
  const dispatchInit = (callback?: () => void) => {
    callback && callback();
    currPage === 1 ? initList() : setCurrPage(1);
  };

  return (
    <GridContent>
      <React.Fragment>
        <ProCard split="vertical" className={styles.bg}>
          <ProCard title="益阳市" colSpan="260px" className={styles.bg}>
            <RoadTree onSelect={onSelect} />
          </ProCard>
          <ProCard className={styles.bg} title={intersectionTitle}>
            <Form {...layout} name="formList" form={form} initialValues={{ remember: true }}>
              <Row>
                <Col span={4}>
                  <Form.Item {...layout} label="类型" name="actionType">
                    <Select placeholder="全部">
                      {_.map(AREASHAPEList, (item, key) => (
                        <Select.Option key={key} value={key}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item {...layout} label="日期" name="comDatetime">
                    <DatePicker placeholder="全部" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item {...layout} label="操作人" name="operator">
                    <Select placeholder="全部">
                      {_.map(AREASHAPEList, (item, key) => (
                        <Select.Option key={key} value={key}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                {/* <Col span={6}>
                  <Form.Item {...layout} label="路口名称" name="intIntersectionName">
                    <Select placeholder="全部">
                      {_.map(list, (item: any,) => (
                        <Select.Option key={item?.intersectionCode} value={item?.intersectionName}>
                          {item?.intersectionName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col> */}
                <Col span={5}>
                  <Form.Item {...layout}>
                    <Button type="primary" onClick={() => dispatchInit()}>
                      确认
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => form?.resetFields()}
                      style={{ marginLeft: 10 }}
                    >
                      重置
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div className={styles.title}>路口列表</div>
            <Table loading={loading} columns={columns} pagination={false} dataSource={tableList} />
            <div className="global-pagination">
              <Pagination
                showQuickJumper
                defaultCurrent={currPage}
                total={tableList?.length}
                onChange={(val: number) => setCurrPage(val)}
              />
            </div>
          </ProCard>
        </ProCard>
      </React.Fragment>
    </GridContent>
  );
};

export default connect(({ maintenance: maintenance, loading }: any) => ({
  tableList: maintenance?.tableList,
  loading: loading.effects['maintenance/fetchList'],
}))(Maintenance);
