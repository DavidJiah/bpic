import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Popconfirm, Modal, Row, Col, TimePicker, Upload } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import ModelForm from './components/ModelForm';
import Draw from './components/canvas.js';
import BaseApi from '@/utils/BaseApi';
import { GridContent } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import RoadTree from '@/components/Intersection/RoadTree';
import styles from './style.less';
import reqwest from 'reqwest';
import { base64ToBlob } from '@/utils/utils';
import { timestamp_to_dateTime } from '@/utils/utils'

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [amplificationModalVisible, handleAmplificationModalVisible] = useState<boolean>(false);
  const [amplificationData, setAmplificationData] = useState<[]>([]);
  const [intersectionId, setIntersectionId] = useState<string>('-1');
  const [intersectionTitle, setIntersectionTitle] = useState<string>('请先选择路口');
  const [formType, setFormType] = useState<string>('creat');
  const actionRef = useRef<ActionType>();
  const childrenRef = useRef<ActionType>();
  const canvasbox = useRef(null);
  const amplification = useRef(null);
  const childDom: any = useRef(null);
  const childrenColumns: ProColumns<any>[] = [
    {
      title: '方位',
      dataIndex: 'entranceExitDirection',
      key: 'entranceExitDirection',
      width: '20%',
    },
    {
      title: '掉头',
      dataIndex: 'uturnVolume',
      key: 'uturnVolume',
      valueType: 'digit',
      width: '20%',
    },
    {
      title: '左转',
      dataIndex: 'leftTurnVolume',
      key: 'leftTurnVolume',
      valueType: 'digit',
      width: '20%',
    },
    {
      title: '直行',
      dataIndex: 'straightVolume',
      key: 'straightVolume',
      valueType: 'digit',
      width: '20%',
    },
    {
      title: '右转',
      dataIndex: 'rightTurnVolume',
      key: 'rightTurnVolume',
      valueType: 'digit',
      width: '20%',
    },
  ];
  const columns: ProColumns<any>[] = [
    {
      title: '采集日期',
      key: 'comRecordDate',
      dataIndex: 'comRecordDate',
      valueType: 'date',
      renderFormItem: () => {
        return <ProFormDateRangePicker label={''} />;
      },
    },
    {
      title: '时间段',
      dataIndex: 'timeRange',
      valueType: 'text',
      hideInForm: false,
      renderFormItem: () => {
        return <TimePicker.RangePicker format={'HH:mm'} />;
      },
    },
    {
      title: '交通状态',
      dataIndex: 'status',
      hideInForm: false,
      hideInSearch: true,
      valueEnum: {
        0: { text: '正常行驶', status: 'Success' },
        1: { text: '修路', status: 'Error' },
      },
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      sorter: false,
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      render: (_, record, index) => (
        <>
          <a
            onClick={async () => {
              setFormType('update');
              handleModalVisible(true);
              childDom.current ? childDom.current.editForm(record) : '';
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            key="popconfirm"
            title={`确认删除吗?`}
            okText="是"
            cancelText="否"
            onConfirm={async () => {
              const success = await handleRemove([record]);
              if (success) {
                actionRef.current?.reload();
              }
            }}
          >
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  // 点击树
  const onSelect = (selectedKeys: any, e: any) => {
    if (e.node.item1) {
      if (e.node.item1.intersectionId) {
        setIntersectionTitle(`${e.node.item1.trfcSlice}-${e.node.item1.intersectionName}`);
        setIntersectionId(e.node.item1.intersectionId);
        actionRef.current?.reload();
      } else {
        message.warning('请先为该路口建档');
      }
    }
  };

  // 删除
  const handleRemove = async (selectedRows: any) => {
    const msg = await BaseApi(
      `/api/biz/intersection/${selectedRows[0].intIntersectionId}/traffic-volume/`,
    ).removeById(selectedRows[0].id);
    if (msg.code === 0) {
      message.success('删除成功');
      return true;
    }
    message.error('删除失败请重试！');
    return false;
  };

  // 流量图弹窗
  const AmplificationModalVisible = (prop: any) => {
    useEffect(() => {
      Draw({
        el: canvasbox.current,
        carVal: prop.data,
        maxLineWidth: 30,
        thresholdVal: 500,
      });
      Draw({
        el: amplification.current,
        carVal: amplificationData,
        maxLineWidth: 50,
        thresholdVal: 500,
      });
    }, [prop]);
    return (
      <Modal
        destroyOnClose
        width="610px"
        visible={amplificationModalVisible}
        onCancel={() => handleAmplificationModalVisible(false)}
        footer={[
          <Button key="back" type="primary" onClick={() => downImage(amplification.current)}>
            下载
          </Button>,
          <Button key="submit" type="primary" onClick={() => saveImage(amplification.current)}>
            保存至图册
          </Button>,
        ]}
      >
        <div
          ref={amplification}
          style={{
            width: '500px',
            height: '500px',
            background: '#141414',
            padding: '20px',
            boxSizing: 'content-box',
          }}
        />
      </Modal>
    );
  };

  // canvas转base64
  const getCanvasUrl = (dom: any) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.setAttribute('style', 'width: 500px; height: 560px');
    canvas.width = 500;
    canvas.height = 560;

    if (ctx != null) {
      const imageData = ctx.getImageData(0, 0, 500, 560);
      for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] === 0) {
          imageData.data[i] = 255;
          imageData.data[i + 1] = 20;
          imageData.data[i + 2] = 20;
          imageData.data[i + 3] = 20;
        }
      }
      ctx.putImageData(imageData, 0, 0);

      ctx.drawImage(dom.children[0], 0, 60, 500, 500);
      ctx.font = '20px Arial';
      ctx.fillStyle = '#fff';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(intersectionTitle + '流量图', 250, 30);

      return canvas.toDataURL('image/jpeg');
    } else {
      return '';
    }
  };

  // 下载流量图
  const downImage = (dom: any) => {
    // ie浏览器需调用此方法
    const convertBase64UrlToBlob = (base64: any) => {
      const parts = base64.split('base64,');
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; i++) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    };

    const base64Url = getCanvasUrl(dom);

    const a = document.createElement('a');
    a.download = intersectionTitle + '流量图';

    if (window.navigator.msSaveOrOpenBlob) {
      // 兼容ie
      var blobObj = convertBase64UrlToBlob(base64Url);
      window.navigator.msSaveOrOpenBlob(blobObj, intersectionTitle + '流量图.png');
    } else {
      a.href = base64Url;
    }

    a.dispatchEvent(new MouseEvent('click'));
  };

  // 保存流量图
  const saveImage = (dom: any) => {
    const base64Url = getCanvasUrl(dom);
    let fileImg = base64ToBlob(base64Url);
    const formData = new FormData();
    formData.append('file', fileImg);
    formData.append('businessId', intersectionId);
    formData.append('businessType', '路口流量图');
    formData.append('groupCode', 'Default');
    formData.append('moduleCode', 'uscp');
    reqwest({
      url: '/api/file/', // 上传url
      method: 'post',
      processData: false,
      data: formData,
      success: (res: any) => {
        if (res.code === 0) {
          message.success('上传成功！');
        }
      },
      error: () => {
        message.error('上传失败！');
      },
    });
    handleAmplificationModalVisible(true);
  };

  const expandedRowRender = (prop: any) => {
    // 展开行
    return (
      <>
        <Row gutter={[30, 0]}>
          <Col span={7}>
            <div
              ref={canvasbox}
              style={{
                width: '220px',
                height: '220px',
                background: '#141414',
                padding: '10px',
                boxSizing: 'content-box',
              }}
              onClick={() => {
                handleAmplificationModalVisible(true),
                  setAmplificationData(prop.trafficVolumeDetailList);
              }}
            />
          </Col>
          <Col span={17}>
            <ProTable
              style={{
                position: 'relative',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              size="small"
              rowKey="id"
              bordered={false}
              columns={childrenColumns}
              headerTitle={false}
              search={false}
              options={false}
              pagination={false}
              actionRef={childrenRef}
              params={prop}
              request={async (params) => {
                return {
                  data: prop.trafficVolumeDetailList,
                  total: 4,
                  success: true,
                };
              }}
            />
          </Col>
        </Row>
        <AmplificationModalVisible data={prop.trafficVolumeDetailList} />
      </>
    );
  };

  const onChange = (info: any) => {
    // 导入流量数据反馈
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      actionRef.current?.reload();
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  return (
    <GridContent>
      <React.Fragment>
        <ProCard split="vertical" className={styles.bg}>
          <ProCard title="益阳市" colSpan="260px">
            <RoadTree onSelect={onSelect} />
          </ProCard>
          <ProCard title={intersectionTitle}>
            <ProTable<any>
              size="small"
              className={styles.flowWarp}
              bordered
              expandable={{ expandedRowRender }}
              headerTitle={'流量数据列表'}
              actionRef={actionRef}
              rowKey="id"
              search={{ labelWidth: 70 }}
              toolBarRender={() => [
                <Button
                  type="dashed"
                  onClick={() => {
                    handleModalVisible(true);
                    setFormType('creat');
                  }}
                >
                  <PlusOutlined /> 新增路口流量
                </Button>,
                <Upload
                  name="trafficVolumeFile"
                  onChange={onChange}
                  showUploadList={false}
                  action="/api/office/traffic-volume/excel-import"
                >
                  <Button type="dashed" onClick={() => {}}>
                    导入
                  </Button>
                </Upload>,
              ]}
              request={async (params) => {
                const newParams = {
                  conditions: [] as any[],
                  size: params?.pageSize,
                  current: params?.current && params?.current - 1,
                };
                for (const key in params) {
                  if (key !== 'current' && key !== 'pageSize') {
                    if (Array.isArray(params[key]) && params[key].length === 2) {
                      if (key === 'timeRange') {
                        newParams.conditions.push(
                          {
                            column: 'comBeginTime',
                            option: 'between',
                            value: params?.timeRange[0],
                            value2: params?.timeRange[1],
                          },
                          {
                            column: 'comEndTime',
                            option: 'between',
                            value: params?.timeRange[0],
                            value2: params?.timeRange[1],
                          },
                        );
                      } else {
                        newParams.conditions.push({
                          column: key,
                          option: 'between',
                          value: params[key][0],
                          value2: params[key][1],
                        });
                      }
                    } else {
                      newParams.conditions.push({ column: key, option: 'eq', value: params[key] });
                    }
                  }
                }
                const msg = await BaseApi(
                  `/api/biz/intersection/${intersectionId}/traffic-volume/`,
                ).page(newParams);
                const newmsg = JSON.parse(JSON.stringify(msg.data.records));
                newmsg.map((item: any) => {
                  item.timeRange = `${timestamp_to_dateTime(item?.comBeginTime)}~${timestamp_to_dateTime(
                    item?.comEndTime,
                  )}`;
                });
                return {
                  data: newmsg,
                  success: true,
                  total: newmsg?.total,
                };
              }}
              columns={columns}
            />
            <ModelForm
              formType={formType}
              ref={childDom}
              onCancel={() => handleModalVisible(false)}
              modalVisible={createModalVisible}
              parentTable={actionRef}
              intersectionId={intersectionId}
              chilrenTable={childrenRef}
            />
          </ProCard>
        </ProCard>
      </React.Fragment>
    </GridContent>
  );
};

export default TableList;
