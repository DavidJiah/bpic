import React from 'react';
import _ from 'lodash';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';

export type GlobalUpload = {
  initialValues: {
    id: string | number,
    businessType: string | number,
  },
  onChange: any,
  type?: string,
  imgUrl?: string,
}

class GlobalUpLoad extends React.Component<GlobalUpload> {
  state = {
    loading: false,
    modalVisible: false,
    imageUrl: ''
  };

  componentDidMount() {
    if (this.props?.imgUrl) this.setState({ imageUrl: this.props?.imgUrl })
  }

  getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) message.error('上传文件格式只支持 jpg/png !')

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) message.error('上传文件/图片超过 10MB !')

    return isJpgOrPng && isLt10M;
  };


  /**
   * @name: 核心逻辑
   * @param {type} code
   */
  customRequest = (info: any) => {
    const { initialValues } = this.props
    const formData = new FormData();
    formData.append('file', info?.file);
    formData.append('businessId', `${initialValues?.id}`);
    formData.append('businessType', `${initialValues?.businessType}`);
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
          const { onChange } = this.props
          const { data } = res
          const imageUrl = `http://116.63.45.33:8888/file/download/${data.id}`
          this.setState({ imageUrl, loading: false });
          message.success('上传成功！');
          onChange && onChange(data)
        }
      },
      error: () => {
        message.error('上传失败！');
      },
    });
  }

  render() {
    const { loading, imageUrl } = this.state;
    const { type } = this.props
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          name="avatar"
          listType="picture-card"
          className={type == 'big' && 'big-upload' || "avatar-uploader"}
          showUploadList={false}
          customRequest={this.customRequest}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ height: '100%' }} /> : uploadButton}
        </Upload>
      </>
    );
  }
}

export default GlobalUpLoad;
