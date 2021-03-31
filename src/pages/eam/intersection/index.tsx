/*
 * @Author: Dad
 * @Date: 2021-03-08 16:20:04
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-11 22:22:27
 */
import { connect, history } from 'umi';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Form, Select, Card, Table, Pagination, message, Cascader } from 'antd';
import style from './style.less';
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE, AREAList, AREASHAPEList } from '@/const'
import _ from 'lodash';
import { getIntersectionInfo } from './service'
import {IntersectionModal} from '@/components/Intersection'

interface IntersectionProps {
  tableList?: [],
  dispatch: any;
  loading: boolean;
  modalVisible: boolean;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const Comp: React.FC<IntersectionProps> = ({ dispatch, tableList, modalVisible, loading }) => {
  const [form] = Form.useForm();
  const [currPage, setCurrPage] = useState(DEFAULT_PAGE_NUM);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [list, setList] = useState<any>([]);
  const [areaList, setAreaList] = useState<any>([]);
  const [initialValues, setInitialValues] = useState<any>({})
  const [disabled, setDisabled] = useState<any>(false)
  const [type, setType] = useState<any>('create')

  useEffect(() => {
    initList()
  }, [currPage])

  useEffect(() => {
    getIntersectionList();
  }, []);

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
  const initList = () => {
    const data = form?.getFieldsValue();
    if (data?.intersection) delete data?.intersection
    dispatch({
      type: 'intersectionList/fetchList',
      queryParams: {
        currPage,
        pageSize,
        template: JSON.stringify(data) == '{}' ? undefined : { ...data },
      },
    })
  }

  /**
   * @name 获取详细的路口信息 
   * 先把老数据清空
   * 根据选中的地域获取对应的路口信息
   * 进行去重和去空
   */
  const getIntersectionDeailInfo = (val: number) => {
    form?.setFieldsValue({ intersectionCode: '' })
    const newList = _.map(list, (item) => { if (item?.trfcSliceStatus == val) return item });
    setAreaList(_.compact(_.uniqBy(newList, 'trfcSlice')));
  }

  /**
   * @name: 触发列表加载effect
   * @param {type}
   */
  const dispatchInit = (callback?: () => void) => {
    callback && callback();
    currPage === 1 ? initList() : setCurrPage(1);
  };

  const addDate = () => { // 新增
    setInitialValues({})
    setDisabled(false)
    setType('create')
    dispatch({type: 'intersectionList/showRoadModal'})
  }

  const look = (record: any) => { // 查看
    setDisabled(true)
    setInitialValues(record)
    setType('look')
    dispatch({type: 'intersectionList/showRoadModal'})
  }
  
  const edit = (record: any) => { // 编辑
    setInitialValues(record)
    setDisabled(false)
    setType('edit')
    dispatch({type: 'intersectionList/showRoadModal'})
  }

  const columns: any = [
    {
      title: '路口编号',
      align: 'center',
      dataIndex: 'intIntersectionCode',
      key: 'intIntersectionCode',
      width: 70,
    },
    {
      title: '路口名称',
      align: 'center',
      dataIndex: 'intIntersectionName',
      key: 'intIntersectionName',
      width: 150,
    },
    {
      title: '路口形状',
      align: 'center',
      dataIndex: 'intIntersectionShape',
      key: 'intIntersectionShape',
      width: 100,
      render: (val: string) => AREASHAPEList[val]
    },
    {
      title: '路口位置',
      align: 'center',
      width: 120,
      render: (item: any) => <div>经度 {item?.intIntersectionLongitude}纬度 {item?.intIntersectionLatitude}</div>
    },
    {
      title: '路口重要程度',
      align: 'center',
      dataIndex: 'intImportanceLevel',
      key: 'intImportanceLevel',
      width: 100,
    },
    {
      title: '电警分布',
      dataIndex: 'intElectricPolice',
      key: 'intElectricPolice',
      width: 70,
    },
    {
      title: '所属辖区',
      align: 'center',
      dataIndex: 'admDistrict',
      key: 'admDistrict',
      width: 100,
    },
    {
      title: '所属大队',
      align: 'center',
      dataIndex: 'admBranch',
      key: 'admBranch',
      width: 100,
    },
    {
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 100,
      render: (text: any, record: any) => <Row><Col span={12}><Button type='link' onClick={() => look(record)}>查看</Button></Col><Col span={12}><Button type='link' onClick={() => edit(record)}>编辑</Button></Col> </Row>
    }
  ];

  const IntersectionModalProps = {
    type: type,
    disabled: disabled,
    initialValues: initialValues,
    visible: modalVisible,
    destroyOnClose: true,
    maskClosable: false,
    width:'910px',
    title: '路口建档',
    centered: true,
    onOk: (data: any) => {
      dispatch({
        type: `amap/create`,
        payload: data,
      })
    },
    onCancel: () =>{
      dispatch({
        type: 'intersectionList/hideRoadModal',
      })
    }
  }

  return (
    <>
      <Card bordered={false} >
        <Form {...layout} name="formList" form={form} initialValues={{ remember: true }}>
          <Row>
            <Col span={2}><Button type="primary" shape="round" onClick={() => addDate()}>新增路口</Button></Col>
            <Col span={4}>
              <Form.Item {...layout} label="地域" name="intersection" >
                <Select placeholder="全部" onChange={(val: number) => getIntersectionDeailInfo(val)}>
                  {_.map(AREAList, (item, key) => (
                    <Select.Option key={key} value={key}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} name="trfcSlice" >
                <Select placeholder="请先选择地域" >
                  {_.map(areaList, (item: any,) => (
                    <Select.Option key={item?.intersectionCode} value={item?.trfcSlice}>
                      {item?.trfcSlice}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item {...layout} label="路口名称" name="intIntersectionName">
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
              <Form.Item {...layout} label="路口形状" name="intIntersectionShape">
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
              <Form.Item {...layout}>
                <Button type="primary" onClick={() => dispatchInit()}>确认</Button>
                <Button type="primary" onClick={() => form?.resetFields()} style={{ marginLeft: 10 }}>重置</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className={style.title}>路口列表</div>
        <Table rowKey="intIntersectionCode" loading={loading} scroll={{ x: 1400 }} columns={columns} pagination={false} dataSource={tableList} />
        <div className="global-pagination" >
          <Pagination showQuickJumper defaultCurrent={currPage} total={tableList?.length} onChange={(val: number) => setCurrPage(val)} />
        </div>
        <IntersectionModal  {...IntersectionModalProps}/>
      </Card>
    </>
  );
}

export default connect(({ intersectionList: intersectionList, loading }: any) => ({
  tableList: intersectionList?.tableList,
  loading: loading.effects['intersectionList/fetchList'],
  modalVisible: intersectionList?.modalVisible
}))(Comp);