/*
 * @Author: Dad
 * @Date: 2021-03-19 14:21:22
 * @LastEditTime: 2021-03-30 11:01:06
 * @LastEditors: Dad
 * @Description:
 */
import { Button, Form, Row, Select, Col, DatePicker, Input, message } from 'antd';
// import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import styles from '../index.less';
import GlobalUpload from '@/components/GlobalUpload';
import _ from 'lodash';
import * as XLSX from 'xlsx';

const Comp: React.FC<any> = () => {
  const [form] = Form.useForm();
  const [imgUrl, setImgUrl] = useState();
  const [data] = useState<any>();
  form?.setFieldsValue({ inspInspReportType: '驾车巡检' });

  /**
   * 下载巡检报告
   * @param https://blog.csdn.net/hhzzcc_/article/details/80419396  按照csdn 写的方法
   */
  const dowlouadInform = () => {
    const data = form?.getFieldsValue();
    //需要处理的数据
    let str = `
    <tr>
      <td>路线概况 (*)</td>
      <td>${data?.inspInspPathSurvey}</td>
    </tr>
    <tr>
      <td>巡检方式 (*)</td>
      <td>${data?.inspInspReportType}</td>
      <td>巡检日期</td>
      <td>${data?.inspTravelTime}</td>
      <td>巡检时段</td>
      <td>${data?.inspTimeSegment}</td>
      <td>巡检人员</td>
      <td>${data?.inspInspector}</td>
    </tr>
    <tr>
      <td>天气 (*)</td>
      <td>${data?.inspWeather}</td>
      <td>联系电话</td>
      <td>${data?.inspContactNumber}</td>
    </tr>
    <tr>
      <td>基本概况(*)</td>
      <td>${data?.inspInspDescription}</td>
    </tr>
    <tr>
      <td>巡检详情(*)</td>
    </tr>
    <tr>
      <td>序号</td>
      <td>路口名称</td>
      <td>控制策略</td>
      <td>协调方向 (*)</td>
      <td>绿波速度 (km/h)(*)</td>
      <td>绿波带宽 (s)</td>
      <td>遇绿灯</td>
      <td>绿灯启亮时长(s)</td>
      <td>绿灯剩余时长(s)</td>
      <td>备注(选填)</td>
      <td>遇红灯</td>
      <td>绿灯结束时长(s)</td>
      <td>红灯等待时长(s)</td>
      <td>备注(选填)</td>
    </tr>

    <tr>
      <td>评价指标</td>
      <td>红绿灯数</td>
      <td>${data?.inspLightCount}</td>
      <td>遇红灯数量</td>
      <td>${data?.inspLightCount}</td>
      <td>绿波率</td>
      <td>${data?.inspLightCount}</td>
      <td>平均速度</td>
      <td>${data?.inspLightCount}</td>
      <td>旅行时间</td>
      <td>${data?.inspLightCount}</td>
    </tr>
    <tr>
      <td>结论</td>
      <td>${data?.inspLightCount}</td>
    </tr>
    <tr>
      <td>建议</td>
      <td>${data?.inspLightCount}</td>
    </tr>
    <tr>
      <td>协调路径图</td>
      <td>轨迹-信号评估图</td>
    </tr>`;

    // Worksheet名
    const worksheet = `xx路径驾车巡检报告`;
    <td>&nbsp;</td>;
    const uri = 'data:application/vnd.ms-excel;base64,';

    // 下载的表格模板数据
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:x="urn:schemas-microsoft-com:office:excel" 
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
      <x:Name>${worksheet}</x:Name>
      <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
      </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      </head><body><table>${str}</table></body></html>`;

    // 下载模板
    window.location.href = uri + window.btoa(unescape(encodeURIComponent(template)));
  };

  const onImportExcel = (file: any) => {
    // 获取上传的文件对象
    debugger;
    // const { files } = file.target;
    const files = file;

    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.onload = (event: any) => {
      try {
        const { result } = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary' });
        // 存储获取到的数据
        let data: any = [];
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          // esline-disable-next-line
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        // 最终获取到并且格式化后的 json 数据
        message.success('文件解析成功！');
        console.log(data);
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        message.error('文件类型不正确！');
      }
    };
    // 以二进制方式打开文件
    // fileReader.readAsBinaryString(files[0]);
    fileReader.readAsBinaryString(files);
    // fileReader.readAsArrayBuffer(files)
  };

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
              <Form.Item name="inspInspPathSurvey" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div className={styles.label}>巡检方式 (*)</div>
            </Col>
            <Col span={4}>
              <Form.Item name="inspInspReportType" className={styles.label}>
                <Input className={styles.input} disabled />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>巡检日期</div>
            </Col>
            <Col span={3}>
              <Form.Item name="inspTravelTime" className={styles.label}>
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>巡检时段</div>
            </Col>
            <Col span={4}>
              <Form.Item name="inspTimeSegment" className={styles.label}>
                <DatePicker.RangePicker picker="time" format="HH:mm" />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>巡检人员</div>
            </Col>
            <Col span={4}>
              <Form.Item name="inspInspector" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div className={styles.label}>天气 (*)</div>
            </Col>
            <Col span={4}>
              <Form.Item name="inspWeather" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className={styles.label}>联系电话</div>
            </Col>
            <Col span={3}>
              <Form.Item name="inspContactNumber" className={styles.label}>
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
              <Form.Item name="inspInspDescription" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className={styles.subtitle}>巡检详情(*)</div>
            </Col>
          </Row>
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
                <Col span={24}>
                  <div className={styles.groupParent}>遇绿灯</div>
                </Col>
                <Col span={8}>
                  <div className={styles.groupChildren}>绿灯启亮时长(s)</div>
                </Col>
                <Col span={8}>
                  <div className={styles.groupChildren}>绿灯剩余时长(s)</div>
                </Col>
                <Col span={8}>
                  <div className={styles.groupChildren}>备注(选填)</div>
                </Col>
              </Row>
            </Col>
            <Col span={5}>
              <Row>
                <Col span={24}>
                  <div className={styles.groupParent}>遇红灯</div>
                </Col>
                <Col span={8}>
                  <div className={styles.groupChildren}>绿灯结束时长(s)</div>
                </Col>
                <Col span={8}>
                  <div className={styles.groupChildren}>红灯等待时长(s)</div>
                </Col>
                <Col span={8}>
                  <div className={styles.groupChildren}>备注(选填)</div>
                </Col>
              </Row>
            </Col>
          </Row>
          {_.map([1, 2, 3], (item: any, index: number) => (
            <Row>
              <Col span={1}>
                <Form.Item name={`intIntersectionId_${index}`} className={styles.label}>
                  <Input className={styles.input} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name={`intIntersectionName${index}`} className={styles.label}>
                  <Input className={styles.input} />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item name={`inspControlStrategy${index}`} className={styles.label}>
                  <Input className={styles.input} />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item name={`scCoordinateDirection${index}`} className={styles.label}>
                  <Input className={styles.input} />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item name={`scGreenWaveSpeed${index}`} className={styles.label}>
                  <Input className={styles.input} />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item name={`scGreenWaveBandWidth${index}`} className={styles.label}>
                  <Input className={styles.input} />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Row>
                  <Col span={8}>
                    <Form.Item name={`inspGreenPassedTime${index}`} className={styles.label}>
                      <Input className={styles.input} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name={`inspGreenRemainTime${index}`} className={styles.label}>
                      <Input className={styles.input} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name={`inspGreenRemark${index}`} className={styles.label}>
                      <Input className={styles.input} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={5}>
                <Row>
                  <Col span={8}>
                    <Form.Item name={`inspGreenOffTime${index}`} className={styles.label}>
                      <Input className={styles.input} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name={`inspRedRemainTime${index}`} className={styles.label}>
                      <Input className={styles.input} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name={`inspRedRemark${index}`} className={styles.label}>
                      <Input className={styles.input} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
          <Row>
            <Col span={3}>
              <div className={styles.label}>评价指标</div>
            </Col>
            <Col span={2}>
              <div className={styles.label}>红绿灯数</div>
            </Col>
            <Col span={2}>
              <Form.Item name="inspLightCount" className={styles.label}>
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
              <Form.Item name="inspReportConclusion" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <div className={styles.label}>建议</div>
            </Col>
            <Col span={21}>
              <Form.Item name="inspReviewRemark" className={styles.label}>
                <Input className={styles.input} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>
                <Col span={5}>
                  <div className={styles.label}>协调路径图</div>
                </Col>
                <Col span={18}>
                  {/* <GlobalUpload
                        imgUrl={imgUrl}
                        editID={rowData?.id}
                        initialValues={initialValues}
                        onChange={(e: any) => {
                          setFileId(e.id);
                        }}
                        type="big"
                      /> */}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={5}>
                  <div className={styles.label}>轨迹-信号评估图</div>
                </Col>
                <Col span={18}>
                  {/* <GlobalUpload
                        imgUrl={imgUrl}
                        editID={rowData?.id}
                        initialValues={initialValues}
                        onChange={(e: any) => {
                          setFileId(e.id);
                        }}
                        type="big"
                      /> */}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className={styles.bottomLine}>
          <Row>
            <Col span={2} offset={18}>
              <Button type="primary" style={{ width: 100 }} onClick={() => dowlouadInform()}>
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
