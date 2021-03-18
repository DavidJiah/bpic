import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Dispatch, AnyAction } from 'redux';
import { PageContainer } from '@ant-design/pro-layout';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProCard from '@ant-design/pro-card';
import { Image, Popover, Form, Input, Button, Modal, message } from 'antd';
import { getopInionInfo, uplaodForm, getImgurl } from '../list/service'
import styles from '../list/index.less';
import moment from 'moment';
import _ from 'lodash';

const { TextArea } = Input;

interface CompProps {
  dispatch: Dispatch<AnyAction>;
  loading: boolean;
}

const UnitInformation = (props: any) => { // 单位信息可编辑列表
  const {data, setFormdata, IsEdit} = props
  const newdata = data
  const setUnitInformation = (eidtform: any) => {
    eidtform.delegationUnit && (newdata.delegationUnit = eidtform.delegationUnit)
    eidtform.receptionUnit && (newdata.receptionUnit = eidtform.receptionUnit)
    eidtform.feedBackTime && (newdata.feedBackTime = moment(eidtform.feedBackTime).valueOf())
    setFormdata(newdata)
  }

  return (
    <>
      <ProDescriptions
        formProps={{
          onValuesChange: (e, newdata) => { setUnitInformation(newdata) },
        }}
        editable={IsEdit}
        className={styles.inscribe}
        column={1}
        request={async () => {
          return Promise.resolve({
            success: true,
            data: data,
          });
        }}
        params={props}
        columns={[
          {
            title: '委托单位',
            key: 'delegationUnit',
            dataIndex: 'delegationUnit',
          },
          {
            title: '受托单位',
            key: 'receptionUnit',
            dataIndex: 'receptionUnit',
          },
          {
            title: '时\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0间',
            key: 'feedBackTime',
            dataIndex: 'feedBackTime',
            valueType: 'date',
          },
        ]}
      >
      </ProDescriptions>
    </>
  )
}

const IsPublish = (props: any) => { // 是否发布弹窗

  const affirm = () => {
    message.success('发布成功')
    props.onCancel()
  }

  return (
    <Modal
      width={500}
      destroyOnClose
      title="保存成功"
      visible={props.modalVisible}
      onCancel={() => props.onCancel()}
      footer={[
        <Button key="no" onClick={() => { props.onCancel() }}>
          再考虑看看
        </Button>,
        <Button key="yes" type="primary" disabled={false} onClick={() => { affirm() }}>
          确定
        </Button>
      ]}
    >
      是否现在发布到线上？
    </Modal>
  )
}

const Detail: React.FC<CompProps> = (props: any) => {
  const { query } = props.location;
  const [eidtform] = Form.useForm();
  const [IsPublishVisible, setIsPublishVisible] = useState<boolean>(false);
  const [IsEdit] = useState<boolean>(query.type === 'edit');
  const [imgurl, setImgurl] = useState<string>('');
  const [Formdata, setFormdata] = useState<any>({
    publicSentimentCode: 'XXX',
    publicSentimentType: 'XXXXXXX',
    correlateIntersection: 'XXXXXXX',
    takingTime: '20201201',
    feedBackTime: moment(),
    clsc: '0',
    proposalPersonName: 'XXX',
    feedBackStatus: '未处理',
    delegationUnit: '益阳市公安局交通警察支队',
    receptionUnit: '湖南中大设计院智慧交通所',
    proposalContent: 'XXXXXXXXXXXXXXXXXXXXXXXX',
    feedBackContent: 'XXXXXXXXXXXXXXXXXXXXXXXX',
  });

  useEffect(() => {
    getopInion()
  }, [query])

  const getopInion = async () => {
    const { code, data, msg } = await getopInionInfo(query.id)
    if (code === 0) {
      let newdata = _.assignIn(data.publicSentiment, data.publicSentimentDetail)
      newdata.feedBackTime = moment()
      newdata.clsc = newdata.feedBackTime.diff(moment(newdata.takingTime), 'day').toString() + '天'
      setFormdata(newdata)
      console.log(newdata)
    } else message.warning(msg)

    // 获取图片
    if(data.publicSentiment.publicSentimentFile) {
      const imgdata = await getImgurl(data.publicSentiment.publicSentimentFile)
      if(imgdata.code === 0) setImgurl(imgdata.data.filePath)
      else message.warning(imgdata.msg)
    }
  }

  const save = async() => {
    const {code, msg} = await uplaodForm(Formdata, query.id)
    if(code === 0) setIsPublishVisible(true)
    else message.warning(msg)
  }

  const headcontent = ( // 舆情页面头部基本信息列表
    <>
      <ProDescriptions
        style={{ padding: '0 20px' }}
        title="详情页"
        request={async() => ({
            success: true,
            data: Formdata,
          })
        }
        params={Formdata}
        columns={[
          {
            title: '舆情编号',
            key: 'publicSentimentCode',
            dataIndex: 'publicSentimentCode',
          },
          {
            title: '舆情类型',
            key: 'publicSentimentType',
            dataIndex: 'publicSentimentType',
          },
          {
            title: '关联路口',
            key: 'correlateIntersection',
            dataIndex: 'correlateIntersection',
          },
          {
            title: '舆情接收时间',
            key: 'takingTime',
            dataIndex: 'takingTime',
            valueType: 'date',
          },
          {
            title: '舆情回复时间',
            key: 'feedBackTime',
            dataIndex: 'feedBackTime',
            valueType: 'date',
          },
          {
            title: '处理时长',
            key: 'clsc',
            dataIndex: 'clsc',
          },
          {
            title: '状态',
            key: 'feedBackStatus',
            dataIndex: 'feedBackStatus',
            valueType: 'select',
            valueEnum: {
              '待回复': {
                text: '待回复',
              },
              '未处理': {
                text: '未处理',
              },
              '已处理': {
                text: '已处理',
              },
            },
          },
        ]}
      >
      </ProDescriptions>
    </>
  );

  const setEidtFormData = () => { // 改变蓝色字体的值
    const formdata = eidtform?.getFieldsValue();
    const newdata = { ...Formdata }
    newdata.proposalPersonName = formdata.proposalPersonName
    if (formdata.proposalContent) newdata.proposalContent = formdata.proposalContent.replace(/(\r\n|\n|\r)/gm, '\n').replace(/[^\S\x0a\x0d]/g, '\xa0')
    if (formdata.feedBackContent) newdata.feedBackContent = formdata.feedBackContent.replace(/(\r\n|\n|\r)/gm, '\n').replace(/[^\S\x0a\x0d]/g, '\xa0')
    setFormdata(newdata)
  }

  const down = async() => { // 下载为doc
    const a = document.createElement('a')
    a.download = '舆情回复'
    
    if (window.navigator.msSaveOrOpenBlob) {// 兼容ie
      message.warning('暂不支持ie下载，请使用谷歌下载')
    } else {
      a.href = '/api/office/public-sentiment/' + Formdata.publicSentimentCode
    }
    
    a.dispatchEvent(new MouseEvent('click'))
  }

  return (
    <>
      <PageContainer
        content={headcontent}
        header={{
          title: '',
        }}
      >
        <ProCard split="vertical" >
          <ProCard title="舆情单:" colSpan="50%">
            {
              imgurl ? (<Image width={'100%'} src={imgurl} />):'暂未上传'
            }
          </ProCard>
          <ProCard title="舆情回复:" colSpan="50%">
            <Form form={eidtform}>
              <div className={styles.replyContent}>
                <h2>关于市长热线（编号：<a>{Formdata.publicSentimentCode}</a>）舆情回复意见</h2>
                <div>
                  <div>尊敬的
                    <Popover
                      content={
                        <Form.Item name="proposalPersonName" initialValue={Formdata.proposalPersonName}>
                          <TextArea className={styles.TextArea} allowClear autoSize={{ minRows: 1 }} onBlur={() => { setEidtFormData() }} />
                        </Form.Item>
                      }
                      trigger="click"
                    >
                      <a>{Formdata.proposalPersonName}</a>
                    </Popover>
                  ：</div>
                  <p>
                    您好!您建议的
                    <Popover
                      content={
                        <Form.Item name="proposalContent" initialValue={Formdata.proposalContent}>
                          <TextArea className={styles.TextArea} allowClear autoSize={{ minRows: 2 }} onBlur={() => { setEidtFormData() }} />
                        </Form.Item>
                      }
                      trigger="click"
                    >
                      <a>{Formdata.proposalContent}</a>
                    </Popover>
                    情况公安交警部门已收悉，感谢您对交通安全管理工作的关心和参与，并提出宝贵建议。现答复如下:
                  </p>
                  <p>
                    <Popover
                      content={
                        <Form.Item name="feedBackContent" initialValue={Formdata.feedBackContent}>
                          <TextArea className={styles.TextArea} allowClear autoSize={{ minRows: 2 }} onBlur={() => { setEidtFormData() }} />
                        </Form.Item>
                      }
                      trigger="click"
                    >
                      <a>{Formdata.feedBackContent}</a>
                    </Popover>
                  </p>
                  <p>再次感谢您对我市交通管理提出宝贵意见。</p>
                </div>
              </div>
            </Form>
            <UnitInformation data={Formdata} setFormdata={setFormdata} IsEdit={IsEdit} />
            {IsEdit && (<div style={{ float: 'right' }}>
              <Button style={{ marginRight: '20px' }} type="primary" onClick={() => { save() }}>保存</Button>
              <Button style={{ marginRight: '20px' }} onClick={() => { history.push({ pathname: '/opinion/add' }) }}>取消</Button>
              <Button onClick={() => { down() }}>下载</Button>
            </div>)}
          </ProCard>
          <IsPublish modalVisible={IsPublishVisible} onCancel={() => setIsPublishVisible(false)} />
        </ProCard>
      </PageContainer>
    </>
  )
}

export default connect(({ loading }: any) => ({
  loading: loading.effects['productManagerList/fetchList'],
}))(Detail);