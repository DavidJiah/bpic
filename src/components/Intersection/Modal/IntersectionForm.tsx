import React, { Component } from 'react'
import { Form, Input, Select, Row, Col, message } from 'antd'
import styles from './IntersectionModal.less'
import {saveIntersection,queryIntersection} from  './service'

const { Option } = Select;
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 14,
  },
  wrapperCol: {
    span: 14,
  },
}


interface Props { 
  initialValues: any
  beforeSubmit: any
}


class IntersectionModal extends Component<Props> {
  formRef = React.createRef()
  state = {
    initialValues:{trfcSlice:''},
    intIntersectionNames: [],
    intersectionCode:null
  }
  onSubmit = () => {
    const { beforeSubmit } = this.props
    const {intersectionCode} = this.state
    this.formRef.current.validateFields()
      .then(async (values: any) => {
        const msg = await saveIntersection({...values,intIntersectionCode:intersectionCode})
        if (msg.code === 0)
          message.success('新增成功');
        else
          message.error(`新增失败,提示（${msg.msg}）`)
        beforeSubmit(msg)
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };
   componentWillMount(){
    queryIntersection().then(res =>this.setState({ intIntersectionNames: res.data }))
   }
   onChange(value: any){
     const {intIntersectionNames} = this.state
     const fvals = intIntersectionNames.filter((e: any)=> e.intersectionName===value)
     if(fvals.length>=1){ 
      const {trfcSlice} = fvals[0]
      this.setState({intersectionCode: fvals[0].intersectionCode})
      this.formRef.current.setFieldsValue({trfcSlice})
     }
   }
  render() {
    const { intIntersectionNames } = this.state
    const { initialValues } =this.props

    return (
      <Form ref={this.formRef} name="intersection" layout="vertical" initialValues={initialValues} className={styles.IntersectionForm} >
        <Row gutter={24}>
          <Col span={12} >
            <FormItem name='intIntersectionName' rules={[{ required: true }]}
              label='路口名称' hasFeedback {...formItemLayout}>
              <Select onChange={this.onChange.bind(this)}>
                {intIntersectionNames.map((item: any, index: number) => (<Option key={index} value={item.intersectionName}>{item.intersectionName}</Option>))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem name='intIntersectionShape' rules={[{ required: true }]} label='路口形状' hasFeedback {...formItemLayout}>
              <Select>
                <Option value="1">T字型</Option>
                <Option value="2">十字型</Option>
                <Option value="3">一字型</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name='intImportanceLevel' rules={[{ required: true }]}
              label='路口重要程度' hasFeedback {...formItemLayout}>
              <Select>
                <Option value="1">高</Option>
                <Option value="2">中</Option>
                <Option value="3">低</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem name='intTrafficSituation' rules={[{ required: true }]}
              label='交通状态' hasFeedback {...formItemLayout}>
              <Select>
                <Option value="1">拥堵</Option>
                <Option value="2">畅通</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem name='intIntersectionLongitude' rules={[{ required: true }]}
              label='路口经度' hasFeedback {...formItemLayout}>
              <Input />
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem name='intIntersectionLatitude' rules={[{ required: true }]}
              label='路口纬度' hasFeedback {...formItemLayout}>
              <Input />
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem name='admDistrict' rules={[{ required: true }]}
              label='所属辖区' hasFeedback {...formItemLayout}>
              <Input />
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem name='admBranch' rules={[{ required: true }]}
              label='所属大队' hasFeedback {...formItemLayout}>
              <Input />
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem name='trfcSlice' rules={[{ required: true }]}
              label='所属片区或路段' hasFeedback {...formItemLayout}>
              <Input />
            </FormItem>
          </Col>
          <Col span={12} >
            <FormItem name='scBrand' rules={[{ required: true }]}
              label='信号机品牌' hasFeedback {...formItemLayout}>
              <Input />
            </FormItem>
          </Col>
          <Col span={24} >
            <FormItem name='intIntersectionDescription' rules={[{ required: true }]}
              label='路口描述' hasFeedback {...formItemLayout}>
              <Input.TextArea maxLength={200} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default IntersectionModal
