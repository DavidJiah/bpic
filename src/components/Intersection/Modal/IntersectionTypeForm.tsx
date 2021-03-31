
import React, { Component } from 'react'
import styles from './IntersectionModal.less'
import { InputNumber, Upload, message, Select, Form, Image } from 'antd'
import { LoadingOutlined, PlusOutlined, ArrowUpOutlined, ArrowDownOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { saveEntranceExit, updateEntranceExit, getEntranceExit } from './service'
import reqwest from 'reqwest';
import _ from 'lodash';

const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


/**
    * 
    * <Option value='5'>
               <svg t="1614062789583" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11307" width="16" height="16"><path d="M554.666667 256a213.333333 213.333333 0 0 1 213.12 204.074667L768 469.333333v341.333334h-85.333333v-341.333334a128 128 0 0 0-255.786667-7.509333L426.666667 469.333333v128h170.666666l-213.376 213.333334L170.666667 597.333333h170.666666v-128a213.333333 213.333333 0 0 1 213.333334-213.333333z" p-id="11308" fill="#1296db"></path></svg>
               调头
             </Option>
             <Option value='6'>
               <svg t="1614062478063" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8445" width="16" height="16"><path d="M846.208 572.416a123.264 123.264 0 0 0-128-126.08H651.52v-95.232l-237.184 120.704 237.056 120.96v-95.232h66.176a72.192 72.192 0 0 1 76.8 74.88 72.192 72.192 0 0 1-76.8 74.88h-560.64v51.2h560.64a123.264 123.264 0 0 0 128.64-126.08z" fill="#1296db" p-id="8446"></path></svg>
               西调头
             </Option>
             <Option value='7'>
               <svg t="1614062536951" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9642" width="16" height="16"><path d="M156.928 528.384a123.264 123.264 0 0 0 128 126.08h66.048v95.232L588.8 628.992l-237.056-120.96v95.232h-66.176a72.192 72.192 0 0 1-76.8-74.88 72.192 72.192 0 0 1 76.8-74.88h560.64v-51.2h-560.64a123.264 123.264 0 0 0-128.64 126.08z" fill="#1296db" p-id="9643"></path></svg>
               东调头
             </Option>
             <Option value='8'>
               <svg t="1614062593601" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10213" width="16" height="16"><path d="M454.016 882.176a123.264 123.264 0 0 0 126.08-128v-66.688h95.232l-120.704-237.056-121.088 236.928h95.36v66.176a72.064 72.064 0 0 1-74.88 76.8 72.192 72.192 0 0 1-75.008-76.8V193.024h-51.2v560.64a123.264 123.264 0 0 0 126.208 128.512z" fill="#1296db" p-id="10214"></path></svg>
               北调头
             </Option>
             <Option value='9'>
               <svg t="1614062572508" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9927" width="16" height="16"><path d="M684.16 661.248v-51.2h-112.768a130.688 130.688 0 0 0 23.424-75.008 123.264 123.264 0 0 0-128-126.08h-66.688v-95.232l-237.056 120.704 236.928 121.088V460.8h66.176a72.064 72.064 0 0 1 76.8 74.88 72.192 72.192 0 0 1-76.8 75.008H108.672v51.2h576z" fill="#1296db" p-id="9928"></path><path d="M921.344 635.648l-237.184-120.96V756.48l237.184-120.832z" fill="#1296db" p-id="9929"></path></svg>
               西直行调头
             </Option>
             <Option value='10'>
               <svg t="1614062632265" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10736" width="16" height="16"><path d="M363.392 678.4h51.2v-112.512A130.048 130.048 0 0 0 489.472 588.8a123.264 123.264 0 0 0 126.08-128v-66.176h95.232L590.08 157.568l-121.088 236.928h95.36V460.8a72.064 72.064 0 0 1-74.88 76.8 72.064 72.064 0 0 1-74.88-76.8V103.168h-51.2V460.8zM388.992 915.84l120.832-237.184H268.032l120.96 237.184z" fill="#1296db" p-id="10737"></path></svg>
                北直行调头
             </Option>
             <Option value='11'>
               <svg t="1614062643956" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11021" width="16" height="16"><path d="M345.6 448v51.2h112.768A130.048 130.048 0 0 0 435.2 573.568a123.264 123.264 0 0 0 128 126.08h66.176v95.232l237.184-120.704-236.544-121.088v95.36H563.2a72.064 72.064 0 0 1-76.8-74.88A72.064 72.064 0 0 1 563.2 499.2h358.4v-51.2H345.6z" fill="#1296db" p-id="11022"></path><path d="M108.672 473.088l237.184 120.832V352.128L108.672 473.088z" fill="#1296db" p-id="11023"></path></svg>
               东直行调头
             </Option>
    * 
    */

interface Props {
  initialValues: any;
  disabled: boolean;
  type: any;
}

class IntersectionTypeForm extends Component<Props> {
  formRef = React.createRef();
  state = {
    loading: false,
    imageUrl: null,
    form1: {
      entranceExitDirection: '东进口', // 进出口路口方向
      intIntersectionId: '',// 路口ID
      intTargetIntersectionId: '', // 目标路口ID
      leftTurnLaneCount: 1,  // 左转车道数
      leftTurnSignalType: '', // 左转信号灯形状
      rightTurnLaneCount: null, // 右转车道数
      rightTurnSignalType: '1',// 右转信号灯形状
      straightLaneCount: null, // 直行车道数
      straightLaneSignalType: '', // 直行信号灯形状
      uturnLaneCount: null, // 掉头车道数
      uturnSignalType: '' // 掉头信号灯形状
    },
    form2: {
      entranceExitDirection: '南进口', // 进出口路口方向
      intIntersectionId: '',// 路口ID
      intTargetIntersectionId: '', // 目标路口ID
      leftTurnLaneCount: null,  // 左转车道数
      leftTurnSignalType: '', // 左转信号灯形状
      rightTurnLaneCount: null, // 右转车道数
      rightTurnSignalType: '',// 右转信号灯形状
      straightLaneCount: null, // 直行车道数
      straightLaneSignalType: '', // 直行信号灯形状
      uturnLaneCount: null, // 掉头车道数
      uturnSignalType: '' // 掉头信号灯形状
    },
    form3: {
      entranceExitDirection: '西进口', // 进出口路口方向
      intIntersectionId: '',// 路口ID
      intTargetIntersectionId: '', // 目标路口ID
      leftTurnLaneCount: null,  // 左转车道数
      leftTurnSignalType: '', // 左转信号灯形状
      rightTurnLaneCount: null, // 右转车道数
      rightTurnSignalType: '',// 右转信号灯形状
      straightLaneCount: null, // 直行车道数
      straightLaneSignalType: '', // 直行信号灯形状
      uturnLaneCount: null, // 掉头车道数
      uturnSignalType: '' // 掉头信号灯形状
    },
    form4: {
      entranceExitDirection: '北进口', // 进出口路口方向
      intIntersectionId: '',// 路口ID
      intTargetIntersectionId: '', // 目标路口ID
      leftTurnLaneCount: null,  // 左转车道数
      leftTurnSignalType: '', // 左转信号灯形状
      rightTurnLaneCount: null, // 右转车道数
      rightTurnSignalType: '',// 右转信号灯形状
      straightLaneCount: null, // 直行车道数
      straightLaneSignalType: '', // 直行信号灯形状
      uturnLaneCount: null, // 掉头车道数
      uturnSignalType: '' // 掉头信号灯形状

    }
  };

  componentWillMount() {
    this.getlist()
  }

  getlist = async () => {
    const { formRef }: any = this
    const { initialValues, type } = this.props
    if (type === 'look' || type === 'edit') {
      const { data, msg, code } = await getEntranceExit(initialValues.intIntersectionId)
      if (+code === 0) {
        _.map(data?.intEntranceExitList, (item: any) => {
          let formKey = ''
          if (item?.entranceExitDirection == '东进口') {
            formKey = 'form1'
          } else if (item?.entranceExitDirection == '南进口') {
            formKey = 'form2'
          } else if (item?.entranceExitDirection == '西进口') {
            formKey = 'form3'
          } else if (item?.entranceExitDirection == '北进口') {
            formKey = 'form4'
          }
          formRef.current?.setFieldsValue({
            [formKey + '.leftTurnLaneCount']: item?.leftTurnLaneCount,  // 左转车道数
            [formKey + '.leftTurnSignalType']: item?.leftTurnSignalType, // 左转信号灯形状
            [formKey + '.rightTurnLaneCount']: item?.rightTurnLaneCount, // 右转车道数
            [formKey + '.rightTurnSignalType']: item?.rightTurnSignalType,// 右转信号灯形状
            [formKey + '.straightLaneCount']: item?.straightLaneCount, // 直行车道数
            [formKey + '.straightLaneSignalType']: item?.straightLaneSignalType, // 直行信号灯形状
            [formKey + '.uturnLaneCount']: item?.uturnLaneCount, // 掉头车道数
            [formKey + '.uturnSignalType']: item?.uturnSignalType // 掉头信号灯形状
          })
        })
      } else message.error(msg)
    }
  }

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  onSubmit = () => {
    const { formRef }: any = this
    const { initialValues, type } = this.props
    const { form1, form2, form3, form4 } = this.state
    if (!initialValues.id && !initialValues.intIntersectionId) {
      message.warning('请先填写，路口基本信息!');
      return
    }
    formRef.current.validateFields()
      .then(async () => {
        if (type === 'create') {
          const models = [form1, form2, form3, form4]
          const msg = await saveEntranceExit(initialValues.id, models)
          if (msg.code === 0) message.success('新增渠化图成功');
          else message.error(`新增渠化图失败，${msg.msg}`);
        } else if (type === 'edit') {
          const models = [form1, form2, form3, form4]
          const msg = await updateEntranceExit(initialValues.intIntersectionId, models)
          if (msg.code === 0) message.success('更新渠化图成功');
          else message.error(`更新渠化图失败，${msg.msg}`);
        }
      })
      .catch((info: any) => {
        console.log('Validate Failed:', info);
      });
  };
  customRequest = (info: any) => {
    const { initialValues } = this.props
    const formData = new FormData();
    formData.append('file', info.file);
    formData.append('businessId', `${initialValues.id}`);
    formData.append('businessType', 'entranceexit');
    formData.append('groupCode', 'Default');
    formData.append('moduleCode', 'uscp');
    this.setState({ loading: true })
    reqwest({
      url: '/api/file/', // 上传url
      method: 'post',
      processData: false,
      data: formData,
      success: (res: any) => {
        if (res.code === 0) {
          const { data } = res
          const imageUrl = `http://116.63.45.33:8888/file/download/${data.id}`
          this.setState({ imageUrl, loading: false });
          message.success('上传成功！');
        }
      },
      error: () => {
        message.error('上传失败！');
      },
    });
  }

  onValuesChange(changedValues: any) {
    const name = Object.keys(changedValues)[0]
    const namPath = name.split('.')
    const form = this.state[namPath[0]]
    form[namPath[1]] = changedValues[name]
    this.setState(form)
  }

  render() {
    const { disabled } = this.props
    const { loading, imageUrl, form1 } = this.state;
    console.log(this.formRef)
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>选择文件</div>
      </div>
    );

    return (
      <Form ref={this.formRef} onValuesChange={this.onValuesChange.bind(this)}>
        <table className={styles.tableForm} >
          <tbody>
            <tr>
              <td colSpan={3} rowSpan={7} style={{ textAlign: 'center' }}>北进口</td>
              <td className={styles.cellCols} >
                <Form.Item name="form1.rightTurnLaneCount"
                  style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>

              <td className={styles.cellCols} >
                <Form.Item name="form1.straightLaneCount" style={{ margin: 0 }}>
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>

              <td className={styles.cellCols} >
                <Form.Item name="form1.leftTurnLaneCount" style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>

              <td className={styles.cellCols} >
                <Form.Item name="form1.uturnLaneCount" style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>
              <td colSpan={7} rowSpan={3} style={{ textAlign: 'center' }}>东进口</td>
            </tr>
            <tr>
              <td className={styles.cellCols}>右转</td>
              <td className={styles.cellCols}>直行</td>
              <td className={styles.cellCols}>左转</td>
              <td className={styles.cellCols}>掉头</td>
            </tr>
            <tr>
              <td className={styles.cellCols}>
                <Form.Item name="form1.rightTurnSignalType" style={{ margin: 0 }} initialValues={form1.rightTurnSignalType}>
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
              <td className={styles.cellCols}>
                <Form.Item name="form1.straightLaneSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
              <td className={styles.cellCols}>
                <Form.Item name="form1.leftTurnSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
              <td className={styles.cellCols}>
                <Form.Item name="form1.uturnSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td colSpan={8} rowSpan={8} style={{ textAlign: 'center' }}>
                <Upload
                  disabled={disabled}
                  beforeUpload={() => {
                    // if(initialValues.id)return true 
                    message.info('上传失败，请先填定信息保存后再上传图片？')
                    return true
                  }}
                  customRequest={this.customRequest}
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={this.handleChange}
                >
                  {imageUrl ? <Image preview={imageUrl} src={imageUrl} width={'100%'} /> : uploadButton}
                </Upload>
              </td>
              <td className={styles.cellRow}>
                <Form.Item name="form2.rightTurnSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
              <td className={styles.cellRow}>右转</td>
              <td className={styles.cellRow}>
                <Form.Item name="form2.rightTurnLaneCount" style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className={styles.cellRow}>
                <Form.Item name="form2.straightLaneSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
              <td className={styles.cellRow}>直行</td>
              <td className={styles.cellRow}>
                <Form.Item name="form2.straightLaneCount" style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className={styles.cellRow}>
                <Form.Item name="form2.leftTurnSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
              <td className={styles.cellRow}>左转</td>
              <td className={styles.cellRow}>
                <Form.Item name="form2.leftTurnLaneCount" style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className={styles.cellRow}>
                <Form.Item name="form2.uturnSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
              <td className={styles.cellRow}>掉头</td>
              <td className={styles.cellRow}>
                <Form.Item name="form2.uturnLaneCount" style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className={styles.cellRow}>
                <Form.Item name="form4.uturnLaneCount" style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>
              <td className={styles.cellRow}>掉头</td>
              <td className={styles.cellRow}>
                <Form.Item name="form4.uturnSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
              <td colSpan={3} rowSpan={7} style={{ textAlign: 'center' }} >南进口</td>
            </tr>
            <tr>
              <td className={styles.cellRow}>
                <Form.Item name="form4.leftTurnLaneCount" style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>
              <td className={styles.cellRow}>左转</td>
              <td className={styles.cellRow}>
                <Form.Item name="form4.leftTurnSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className={styles.cellRow}>
                <Form.Item name="form4.straightLaneCount" style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>
              <td className={styles.cellRow}>直行</td>
              <td className={styles.cellRow}>
                <Form.Item name="form4.straightLaneSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td className={styles.cellRow}>
                <Form.Item name="form4.rightTurnLaneCount" style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>
              <td className={styles.cellRow}>右转</td>
              <td className={styles.cellRow}>
                <Form.Item name="form4.rightTurnSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
            </tr>
            <tr>
              <td colSpan={7} rowSpan={3} style={{ textAlign: 'center' }}>西进口</td>
              <td className={styles.cellCols} >
                <Form.Item name="form3.uturnSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
              <td className={styles.cellCols} >
                <Form.Item name="form3.leftTurnSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
              <td className={styles.cellCols} >
                <Form.Item name="form3.straightLaneSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
              <td className={styles.cellCols} >
                <Form.Item name="form3.rightTurnSignalType" style={{ margin: 0 }} >
                  <Select disabled={disabled} allowClear style={{ width: '100%', minWidth: '64px' }}>
                    <Option value="1"><ArrowUpOutlined /></Option>
                    <Option value="2"><ArrowDownOutlined /></Option>
                    <Option value="3"><ArrowLeftOutlined /></Option>
                    <Option value="4"><ArrowRightOutlined /></Option>
                  </Select>
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td className={styles.cellCols}>掉头</td>
              <td className={styles.cellCols}>左转</td>
              <td className={styles.cellCols}>直行</td>
              <td className={styles.cellCols}>右转</td>
            </tr>
            <tr>
              <td className={styles.cellCols}>
                <Form.Item name="form3.uturnLaneCount" style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>
              <td className={styles.cellCols}>
                <Form.Item name="form3.leftTurnLaneCount" style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>
              <td className={styles.cellCols}>
                <Form.Item name="form3.straightLaneCount" style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>
              <td className={styles.cellCols}>
                <Form.Item name="form3.rightTurnLaneCount" style={{ margin: 0 }} >
                  <InputNumber disabled={disabled} min={1} max={5} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    )
  }
}

export default IntersectionTypeForm
