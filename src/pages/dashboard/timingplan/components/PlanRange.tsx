/*
 * @Author: Dad
 * @Date: 2021-03-08 16:20:04
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-18 17:55:44
 */
/*
时间计划
*/
import 'rc-slider/assets/index.css';
import ProCard from '@ant-design/pro-card';
import { Button, Form, TimePicker, Modal, Tag, Select, Space, Table, Popover, Input, message } from 'antd';
import _ from 'lodash';
import { TIME_PLAN, DAY_VAL } from '@/const';
import styles from './plan.less';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { saveTimePlanApi, queryTimePlanList, getTimePlan, updataTimePlanApi, deteleTimePlanApi } from '../service';
import { dateTime_to_timestamp } from '@/utils/utils'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const Day = 'YYYY-MM-DD HH:mm:ss'

const defaulList = [{
  id: new Date().getTime(),
  width: 100,
  left: 0,
  program: '关灯',
  color: '#bfbfbf',
  comBeginTime: moment(new Date(new Date().toLocaleDateString())).format(Day),
  comEndTime: moment(new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)).format(Day)
}]

export default ({ intIntersectionId }: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [schemenList, setSchemenList] = useState<any>(TIME_PLAN)
  const [popoverVisible, setPopoverVisible] = useState<any>(false)
  const [timePlanList, setTimePlanList] = useState<any>([])
  const [currentTagKey, setCurrentTagKey] = useState<any>()
  const [dailyPlanId, setDailyPlanId] = useState<any>()
  const [timePlanArr, setTimePlanArr] = useState<any>(defaulList)
  const [form] = Form.useForm();
  const [timePlanForm] = Form.useForm();

  useEffect(() => {
    initList()
  }, [intIntersectionId]);

  const initList = async () => {
    const { msg, data, code }: any = await queryTimePlanList(intIntersectionId)
    if (code == 0) setTimePlanList(data?.dailyPlanList)
    else message.error(msg)
  }

  /**
   * @name 拆分
   */
  const splitSubmit = () => {
    const obj = form?.getFieldsValue();

    let newarr = JSON.parse(JSON.stringify(timePlanArr))
    const deletedData = newarr.splice(index, 1)
    const addArr = [
      { program: deletedData[0]?.program, comBeginTime: deletedData[0]?.comBeginTime, comEndTime: moment(obj.comEndTime).format(Day) },
      { program: obj.program, comBeginTime: moment(obj.comEndTime, Day).format(Day), comEndTime: deletedData[0]?.comEndTime }
    ]
    addArr[0] = { ...addArr[0], ...getWidthLeftColor(addArr[0]) }
    addArr[1] = { ...addArr[1], ...getWidthLeftColor(addArr[1]) }

    // 添加拆分后的数据
    newarr.splice(index, 0, addArr[0], addArr[1])
    setTimePlanArr([])
    setTimePlanArr(newarr)
    setVisible(false);
    form?.resetFields();
  };

  /**
   * @name 刪除
   */
  const deteleSubmit = (data: any, index: any) => {
    let newarr = JSON.parse(JSON.stringify(timePlanArr))
    let addData = { program: data?.program, comBeginTime: data?.comBeginTime, comEndTime: moment(data.comEndTime).format(Day) }
    const deteleData = newarr.splice(index - 1, 2)
    addData = { ...deteleData[0], comEndTime: deteleData[1].comEndTime }
    addData = { ...addData, ...getWidthLeftColor(addData) }
    newarr.splice(index - 1, 0, addData)
    setTimePlanArr([])
    setTimePlanArr(newarr)
  };

  /**
   * @name 计算宽高，匹配颜色
   * @param width: 计算时间段的宽度
   * @param left： 计算时间段离0点的距离
   * @param color 方案的颜色
   */
  const getWidthLeftColor = (obj: any) => {
    const width = ((moment(obj?.comEndTime).unix() - moment(obj?.comBeginTime).unix()) / DAY_VAL) * 100
    const left = ((moment(obj?.comBeginTime).unix() - moment().startOf('day').unix()) / DAY_VAL) * 100
    const color = _.find(schemenList, { 'value': obj?.program })?.color
    return { width, left, color }
  }

  const columns: any = [
    {
      title: '开始时间',
      align: 'center',
      dataIndex: 'comBeginTime',
      width: 150,
      render: (item: any) => (
        moment(item).format('HH:mm:ss')
      ),
    },
    {
      title: '结束时间',
      align: 'center',
      dataIndex: 'comEndTime',
      render: (item: any) => (
        moment(item).format('HH:mm:ss')
      ),
      width: 150,
    },
    {
      title: '方案',
      align: 'center',
      dataIndex: 'program',
      width: 150,
    },
    {
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 100,
      render: (text: any, record: any, index: any) => (
        <Space>
          {index !== 0 && <a onClick={() => {
            deteleSubmit(record, index)
          }}>删除</a>}
          <a onClick={() => {
            setVisible(true)
            setIndex(index)
            form.setFieldsValue({ comBeginTime: moment(record?.comBeginTime, Day) })
          }}>拆分</a>
        </Space>
      )
    }
  ]

  const saveTimePlan = async () => { // 保存计划提交
    const pushList = _.map(timePlanArr, (item: any) => {
      item = {
        comBeginTime: dateTime_to_timestamp(item?.comBeginTime),
        comEndTime: dateTime_to_timestamp(item?.comEndTime),
        scControlPlanId: _.find(schemenList, { 'value': item?.program })?.id
      }
      return item
    })
    const saveBody = {
      dailyPlan: { scDailyPlanName: currentTagKey?.timePlanName },
      dailyPlanSectionList: pushList,
    }
    if (!dailyPlanId) {
      const { msg, code }: any = await saveTimePlanApi(intIntersectionId, saveBody)
      if (code == 0) message.success("新增成功")
      else message.error(msg)
    } else {
      const { msg, code }: any = await updataTimePlanApi(intIntersectionId, dailyPlanId, saveBody)
      if (code == 0) message.success("修改成功")
      else message.error(msg)
    }

  }

  const addPlan = () => { // 添加计划tag
    timePlanForm.validateFields().then((res: any) => {
      let newList = timePlanList
      newList.push({ scDailyPlanName: res?.timePlanName, type: 'add' })
      setTimePlanList(newList)
      setPopoverVisible(false)
      setCurrentTagKey(res)
    })
  }

  const tabTimePlan = async ({id, type, timePlanName}: any) => { // 点击单个计划查询详情
    setCurrentTagKey({id, type, timePlanName})
    if (type === 'add') {
      setTimePlanArr(defaulList)
    } else {
      const { msg, code, data }: any = await getTimePlan(intIntersectionId, id)
      setDailyPlanId(data?.dailyPlan?.id)
      if (code == 0) {
        let list = _.map(data?.dailyPlanSectionList, (item: any) => {
          let itemObj = {
            comBeginTime: moment(moment(item?.comBeginTime).utcOffset(0)).format(Day),
            comEndTime: moment(moment(item?.comEndTime).utcOffset(0)).format(Day),
            program: _.find(schemenList, { 'id': item?.scControlPlanId })?.value
          }
          itemObj = { ...itemObj, ...getWidthLeftColor(itemObj) }
          return itemObj
        })
        setTimePlanArr(list)
      } else message.error(msg)
    }
  }

  const deteleTimePlan = async() => { // 删除日计划
    const {msg, code} = await deteleTimePlanApi(intIntersectionId, dailyPlanId)
    if(code==0) message.success('删除成功')
    else message.error(msg)
  }

  return (
    <>
      <ProCard title="时间计划" className="ant-card">
        <div>
          {_.map(TIME_PLAN, (item: any) => (
            <Tag color={item?.color} key={item?.id}>
              {item.value}
            </Tag>
          ))}
        </div>
        <div className={styles.timePlan}>
          <div>
            {_.map(timePlanList, (item: any) => (
              <Tag color="blue" onClick={() => tabTimePlan(item)}>
                {item?.scDailyPlanName}
              </Tag>
            ))}
          </div>
          <Space>
            <Popover
              visible={popoverVisible}
              content={
                <Form form={timePlanForm}>
                  <Form.Item name="timePlanName" rules={[{ required: true, message: "请输入计划名称" }]}>
                    <Input placeholder="输入计划名称" />
                  </Form.Item>
                  <Form.Item>
                    <Space>
                      <Button onClick={() => setPopoverVisible(false)}>取消</Button>
                      <Button type="primary" htmlType="submit" onClick={() => { addPlan() }}>确定</Button>
                    </Space>
                  </Form.Item>
                </Form>
              }
              trigger="click"
            >
              <Button className={styles.button} onClick={() => { setPopoverVisible(true) }}>新增计划</Button>
            </Popover>
            <Button className={styles.button} onClick={() => { saveTimePlan() }}>保存计划</Button>
            <Button className={styles.button} onClick={() => { deteleTimePlan() }}>删除当前计划</Button>
          </Space>
        </div>
        <div className={styles.planLine}>
          <div className={styles.unPlan}>
            <span>00:00:00</span>
            <span>23:59:59</span>
          </div>
          {timePlanArr?.map((item: any) => (
            <div
              className={styles.plan}
              style={{
                width: `${item?.width}%`,
                backgroundColor: item?.color,
                marginLeft: `${item?.left}%`,
                color: '#fff',
              }}
            >
              {item?.program}
              <span className={styles.scale}>{moment(item?.comEndTime).format('HH:mm:ss')}</span>
            </div>))
          }
        </div>
        <Table
          columns={columns}
          dataSource={timePlanArr}
          pagination={false}
          rowKey='id'
        />
        <Modal
          title="拆分"
          visible={visible}
          forceRender
          onOk={form.submit}
          onCancel={() => setVisible(false)}
        >
          <Form {...layout} name="basic" form={form} onFinish={(values) => splitSubmit()}>
            <Form.Item
              label="起始时间"
              name="comBeginTime"
              rules={[{ required: true, message: '请选择开始时间!' }]}
            >
              <TimePicker disabled />
            </Form.Item>
            <Form.Item
              label="结束时间"
              name="comEndTime"
              rules={[{ required: true, message: '请选择结束时间!' }]}
            >
              <TimePicker />
            </Form.Item>
            <Form.Item
              label="选择方案"
              name="program"
              rules={[{ required: true, message: '请选择方案!' }]}
            >
              <Select style={{ width: 120 }}>
                {_.map(TIME_PLAN, (item: any) => (
                  <Select.Option value={item.value}>{item.value}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </ProCard>
    </>
  );
};
