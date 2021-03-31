/*
 * @Author: Dad
 * @Date: 2021-03-19 14:21:22
 * @LastEditTime: 2021-03-20 16:17:47
 * @LastEditors: Dad
 * @Description:
 */
import { Button, Form, Row, Select, Col, DatePicker, Input } from 'antd';
// import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import styles from '../index.less';

const Comp: React.FC<any> = () => {
  const [form] = Form.useForm();
  return (
    <div className="template">
      <Form form={form}>
        <Form.Item name="timer" label="选择路线">
          <Select style={{ width: 200 }}>
            <Select.Option value="jack">Jack</Select.Option>
          </Select>
        </Form.Item>
        <div className={styles.title}>xx路径驾车巡检报告</div>
        <div className={styles.content}>
          <Row>
            <Col span={3}>
              <div className={styles.label}>路线概况 (*)</div>
            </Col>
            <Col span={21}>
              <Form.Item name="affd" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div className={styles.label}>巡检方式 (*)</div>
            </Col>
            <Col span={2}>
              <Form.Item name="asasdd" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item name="asjjd" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>巡检日期</div>
            </Col>
            <Col span={3}>
              <Form.Item name="ajjjsd" className={styles.label}>
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>巡检时段</div>
            </Col>
            <Col span={4}>
              <Form.Item name="jjasd" className={styles.label}>
                <DatePicker.RangePicker picker="time" format="HH:mm" />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>巡检人员</div>
            </Col>
            <Col span={4}>
              <Form.Item name="asjjd" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div className={styles.label}>天气 (*)</div>
            </Col>
            <Col span={4}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>联系电话</div>
            </Col>
            <Col span={3}>
              <Form.Item name="lxdh" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item name="lxdh2" className={styles.label}>
                {/* <Input className={styles.input} /> */}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="lxdh3" className={styles.label}>
                {/* <Input className={styles.input} /> */}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="lxdh4" className={styles.label}>
                {/* <Input className={styles.input} /> */}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div className={styles.label}>基本概况(*)</div>
            </Col>
            <Col span={21}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row><Col span={24}><div className={styles.subtitle}>巡检详情(*)</div></Col></Row>
          <Row>
            <Col span={1}>
              <div className={styles.label}>序号</div>
            </Col>
            <Col span={4}>
              <div className={styles.label}>路口名称 (*)</div>
            </Col>
            <Col span={2}>
              <div className={styles.label}>控制策略 (*)</div>
            </Col>
            <Col span={2}>
              <div className={styles.label}>协调方向 (*)</div>
            </Col>
            <Col span={3}>
              <div className={styles.label}>绿波速度 (km/h)(*)</div>
            </Col>
            <Col span={2}>
              <div className={styles.label}>绿波带宽 (s)</div>
            </Col>
            <Col span={5}>
              <Row>
                <Col span={24}><div className={styles.groupParent}>遇绿灯</div></Col>
                <Col span={8}><div className={styles.groupChildren}>绿灯启亮时长(s)</div></Col>
                <Col span={8}><div className={styles.groupChildren}>绿灯剩余时长(s)</div></Col>
                <Col span={8}><div className={styles.groupChildren}>备注(选填)</div></Col>
              </Row>
            </Col>
            <Col span={5}>
              <Row>
                <Col span={24}><div className={styles.groupParent}>遇红灯</div></Col>
                <Col span={8}><div className={styles.groupChildren}>绿灯结束时长(s)</div></Col>
                <Col span={8}><div className={styles.groupChildren}>红灯等待时长(s)</div></Col>
                <Col span={8}><div className={styles.groupChildren}>备注(选填)</div></Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={1}>
              <div className={styles.label}>1</div>
            </Col>
            <Col span={4}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Row>
                <Col span={8}>
                  <Form.Item name="weather" className={styles.label}>
                    <Input className={styles.input} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="weather" className={styles.label}>
                    <Input className={styles.input} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="weather" className={styles.label}>
                    <Input className={styles.input} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={5}>
              <Row>
                <Col span={8}>
                  <Form.Item name="weather" className={styles.label}>
                    <Input className={styles.input} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="weather" className={styles.label}>
                    <Input className={styles.input} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="weather" className={styles.label}>
                    <Input className={styles.input} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div className={styles.label}>协调路径图</div>
            </Col>
            <Col span={21}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div className={styles.label}>轨迹-信号评估图</div>
            </Col>
            <Col span={21}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div className={styles.label}>评价指标</div>
            </Col>
            <Col span={2}>
              <div className={styles.label}>红绿灯数</div>
            </Col>
            <Col span={2}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>遇红灯数量</div>
            </Col>
            <Col span={2}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>绿波率</div>
            </Col>
            <Col span={2}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>平均速度</div>
            </Col>
            <Col span={2}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>旅行时间</div>
            </Col>
            <Col span={3}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div className={styles.label}>结论</div>
            </Col>
            <Col span={21}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div className={styles.label}>建议</div>
            </Col>
            <Col span={21}>
              <Form.Item name="weather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className={styles.bottomLine}>
          <Row>
            <Col span={2} offset={18}>
              <Button type="primary" style={{ width: 100 }}>
                下载
              </Button>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ width: 100 }}>
                返回
              </Button>
            </Col>
            <Col span={2}>
              <Button
                type="primary"
                style={{ width: 100 }}
                onClick={() => {
                  console.log(form.getFieldsValue());
                }}
              >
                提交审核
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
export default Comp;
