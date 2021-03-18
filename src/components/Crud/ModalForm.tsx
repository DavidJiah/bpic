/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Modal, message, Form, Row, Col, TimePicker, DatePicker, Select, InputNumber, Input, Switch } from 'antd';
import moment from 'moment';
import BaseApi from './BaseApi';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface FormItem {
    span?: string;
    dataIndex: string | number | React.ReactText[];
    title: string;
    rules?: never[];
    valueEnum?: any;
}

interface FormsProps {
    span?: any;
    formProps?: any;
    onSubmit?: any;
    columns: FormItem[] | any[];
    modalVisible: boolean;
    onCancel: () => void;
    title: string;
    type: string,
    api?: string;
    initialValues?: any;
    modalWidth?: any;
    reload: () => void;
    rowKey?: 'id'
}



const Forms: React.FC<FormsProps> = (props) => {
    const { formProps, columns, span, modalVisible, onCancel, title, api, type, initialValues, modalWidth, reload, rowKey } = props;
    const [form] = Form.useForm();
    const dinitialValues = JSON.parse(JSON.stringify(initialValues))
    columns.forEach(item => {
        if (['dateTime', 'date'].includes(item.valueType)) {
            dinitialValues[item.dataIndex] = dinitialValues[item.dataIndex] && moment(dinitialValues[item.dataIndex])
        }
    })
    const dateColumns = columns.filter(e => ['date', 'dateTime', 'dateRange', 'dateTimeRange', 'time'].includes(e.valueType)).map(e => e.dataIndex)

    /**
     * 
       控件类型
       money	转化值为金额	¥10,000.26
       date	日期	2019-11-16
       dateRange	日期区间	2019-11-16 2019-11-18
       dateTime	日期和时间	2019-11-16 12:50:00
       dateTimeRange	日期和时间区间	2019-11-16 12:50:00 2019-11-18 12:50:00
       time	时间	12:50:00
       option	操作项，会自动增加 marginRight，只支持一个数组,表单中会自动忽略	[<a>操作a</a>,<a>操作b</a>]
       text	默认值，不做任何处理	-
       select	选择	-
       textarea	与 text 相同， form 转化时会转为 textarea 组件	-
       index	序号列	-
       indexBorder	带 border 的序号列	-
       progress	进度条	-
       digit	格式化数字展示，form 转化时会转为 inputNumber	-
       percent	百分比	+1.12
       code	代码块	const a = b
       avatar	头像	展示一个头像
       password	密码框	密码相关的展示 
       */
    const Components = (item: any, index: number) => {

        const valueType = item.valueType || 'text'
        const inputProps = item.inputProps || {}
        if (valueType === 'select') {
            const valueEnum = Object.keys(item.valueEnum)
            return <Select key={index}   {...inputProps}> {valueEnum.map((key, i) => (<Option key={`o${i}`} value={key} {...item.valueEnum[key]}>  {item.valueEnum[key].text} </Option>))}</Select>
        }
        if (valueType === 'money') {
            return <InputNumber key={index}  {...inputProps} defaultValue={1000} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => (value && value.replace(/\$\s?|(,*)/g, ''))} />
        }
        if (valueType === 'date') {
            return <DatePicker key={index} picker='date' {...inputProps} style={{ width: '100%' }} />
        }
        if (valueType === 'dateRange') {
            return <RangePicker key={index}  {...inputProps} style={{ width: '100%' }} />
        }
        if (valueType === 'dateTime') {
            return <DatePicker key={index}  {...inputProps} showTime style={{ width: '100%' }} />
        }
        if (valueType === 'dateTimeRange') {
            return <RangePicker key={index}  {...inputProps} showTime style={{ width: '100%' }} />
        }
        if (valueType === 'time') {
            return <TimePicker key={index} {...inputProps} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} style={{ width: '100%' }} />
        }
        if (valueType === 'text') {
            return <Input key={index} {...inputProps} />
        }
        if (valueType === 'textarea') {
            return <TextArea key={index} showCount maxLength={100} style={{ width: '100%' }} {...inputProps} />
        }
        if (valueType === 'textarea') {
            return <TextArea key={index} showCount maxLength={100} style={{ width: '100%' }} {...inputProps} />
        }
        if (valueType === 'switch') {
            return <Switch  {...inputProps} />
        }


    };

    const getModel = (values: any) => {
        const model = JSON.parse(JSON.stringify(values))
        dateColumns.forEach(item => {
            if (model[item] instanceof array)
                model[item] = model[item].map((e: any) => new Date(e).getTime())
            else
                model[item] = new Date(model[item]).getTime()
        })
        return model
    }
    const messageInfo = (msg: any) => {
        if (msg.code === 0)
            message.success('操作成功，即将刷新');
        else
            message.error('操作失败，请联系管理员')
    }

    const onSubmit = async () => {
        form.validateFields()
            .then(async (values) => {
                /* 
                view 查看 
                edit 编辑 
                copy 复制
                */
                const model = getModel(values)
                const service = BaseApi(api)
                if (type === 'edit') {
                    const msg = await service.update(dinitialValues[rowKey], model);
                    messageInfo(msg)
                } else if (type === 'add') {
                    const msg = await service.save(model)
                    messageInfo(msg)
                } else if (type === 'copy') {
                    const msg = await service.save(model);
                    messageInfo(msg)
                }
                reload()
                onCancel()
                return true
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });

    };
    const getFromItem = (item: any, index: any) => {

        const fromItem = { key: `i${index}`, name: item.dataIndex, rules: item.rules, label: item.title }
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        item.valueType === 'switch' ? fromItem.valuePropName = 'checked' : ''
        return fromItem
    }
    return (
        <Modal
            centered
            title={title}
            visible={modalVisible}
            width={modalWidth}
            onOk={() => onSubmit()}
            onCancel={() => onCancel()}
        >
            <Form {...formProps} form={form} initialValues={dinitialValues}>
                <Row gutter={24}>
                    {columns && columns.map((item: any, index: number) => (
                        <Col span={item.span || span} key={`c${index}`} >
                            <Form.Item {...getFromItem(item, index)}>
                                {Components(item, index)}
                            </Form.Item>
                        </Col>
                    ))}
                </Row>
            </Form>
        </Modal>
    );
};

export default Forms;
