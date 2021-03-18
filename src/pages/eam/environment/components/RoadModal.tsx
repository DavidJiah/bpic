import React, { Component } from 'react'
import { Form, Input, Row, Col, Modal, Upload, message } from 'antd'
import './RoadModal.less'
import { PlusOutlined,LoadingOutlined } from '@ant-design/icons'; 
import reqwest from 'reqwest';
import {saveEnvFactor,updateEnvFactor,queryFilePage,delFile} from '../service'

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}


class RoadModal extends Component<any> {

  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
    factorData: {id:null},
    loadingUpload: false,
  };

  formRef = React.createRef()

  componentDidMount(){
    this.fileList()
  }
  fileList= async () => {
    const { initialValues } = this.props 
    const { factorData } = this.state
    const id = factorData.id||initialValues.id
    if(!id) return;
    const msg = await queryFilePage({size:-1,template:{businessId:`${initialValues.intIntersectionId}-${id}`,groupCode: 'Default',businessType:'envfactor',moduleCode:'uscp'}})

    this.setState({fileList:msg.data.records.map((data: any)=>{ 
      return { url: `http://116.63.45.33:8888/file/download/${data.id}`,status: 'done',uid: data.id,name: data.sourceFileName}
    })})
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async (info: any) =>{
    const {fileList} = info
    this.setState(fileList);
  }

 
  handleOk = () => {
    const { initialValues } = this.props 
    const { factorData } = this.state
    this.formRef.current.validateFields()
      .then(async (values: any) => {
        const data = {
          id:factorData.id||initialValues.id,
          entranceExitDirection: values.entranceExitDirection,
          distance: values.entranceExitDirection,
          intEnvFactorDescription: values.intEnvFactorDescription,
          intIntersectionId: initialValues.intIntersectionId
        }
        if(factorData.id || initialValues.id){
          const msg = await updateEnvFactor(initialValues.intIntersectionId,data)
          if (msg.code === 0){
            message.success('更新成功');
            this.setState({factorData:msg.data})
          }else{
            message.error('更新失败，请联系管理员')
          }
        }else{
          const msg = await saveEnvFactor(initialValues.intIntersectionId,data)
          if (msg.code === 0){
            message.success('新增成功');
            this.setState({factorData:msg.data})
          }else{
            message.error('新增失败，请联系管理员')
          }
        }
        // onOk(data)
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  handleCancel = () => this.setState({ previewVisible: false });

  customRequest=(info: any) => {
    const {fileList,factorData} = this.state
    const { initialValues } = this.props 

    const formData = new FormData();
    const id = factorData.id||initialValues.id

    formData.append('file', info.file);
    formData.append('businessId', `${initialValues.intIntersectionId}-${id}`);
    formData.append('businessType', 'envfactor');
    formData.append('groupCode', 'Default');
    formData.append('moduleCode', 'uscp');
    this.setState({loadingUpload:true})
    reqwest({
      url: '/api/file/', // 上传url
      method: 'post',
      processData: false,
      data: formData,
      success: (res: any) => { 
        if (res.code === 0) {
          const {data} = res 
          fileList.push({ url: `http://116.63.45.33:8888/file/download/${data.id}`,status: 'done',uid: data.id,name: data.sourceFileName})
          this.setState({fileList});
          message.success('上传成功！');
          this.setState({loadingUpload:false})
        }
      },
      error: () => {
        message.error('上传失败！');
      },
    });
  }
  render() {

    const { initialValues, ...modalProps } = this.props
    const { previewVisible, previewImage, fileList, previewTitle,factorData,loadingUpload } = this.state;

    const uploadButton = (
      <div>
        {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传文件</div>
      </div>
    );
    
    return (
      <Modal title={'路口环境因素'} {...modalProps} onOk={this.handleOk} >
        <Form ref={this.formRef} name="basic" layout="vertical" initialValues={{...initialValues}}>
          <Row gutter={24}>
            <Col span={12} >
              <Form.Item name='entranceExitDirection' rules={[{ required: true }]}
                label='方向' {...formItemLayout}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} >
              <Form.Item name='distance' rules={[{ required: true }]}
                label='距离' {...formItemLayout}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} >
              <Form.Item name='intEnvFactorDescription' rules={[{ required: true }]}
                label='文字说明' {...formItemLayout}>
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={24} >
              <Form.Item name='name5'
                label='上传图片' {...formItemLayout}>
                <Upload
                  listType="picture-card"
                  beforeUpload={()=>{
                    if(!!factorData.id||!!initialValues.id)return true 
                     message.info('上传失败，请先填定信息保存后再上传图片？')
                    return false
                  }}
                  customRequest={this.customRequest}
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                  onRemove={ async ({uid})=>{
                    const msg = await delFile(uid)
                    if (msg.code === 0)
                    {
                      this.setState({fileList:fileList.filter((e: any)=>e.uid!==uid)})
                      message.success('删除成功');
                    }
                    else
                    {
                      message.error('删除失败，请联系管理员')
                    }
                  }}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default RoadModal
