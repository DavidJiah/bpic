/*
 * @Author: Dad
 * @Date: 2021-03-10 16:35:45
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-15 16:51:58
 */
import React from 'react';
import { Row, Col, Button, Image } from 'antd'
import {
    ModalForm,
    ProFormText,
    ProFormSelect,
    ProFormTextArea,
    ProFormDigit
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import './phase.less'


const scDirectionDescriptionMap = {
    '1': '北左直',
    '2': '南左直',
    '3': '东左直',
    '4': '西左直',
    '5': '南北直',
    '6': '南北左',
    '7': '北直+东左',
    '8': '南直+西左',
    '9': '东西直',
    '10': '东西左',
    '11': '西直+北左',
    '12': '东直+南左',
    '13': '西北左直',
    '14': '东西左直'
}

const PhaseModel: React.FC<any> = (props) => {

    const { list, onAdd } = props
    return (
        <ModalForm<{ name: string; company: string; }>
            title="添加相位流向"
            width='780px'
            trigger={<Button type="dashed" ghost><PlusOutlined />添加相位</Button>}
            onFinish={async (values: any) => {
                values.scDirectionNumber = values.scDirectionNumber.join()
                onAdd && onAdd(values)
                return true;
            }}
        >
            <Row>
                <Col span={14}>
                    <Image width={380} src="./phase.png" />
                </Col>
                <Col span={10}>
                    <ProFormDigit
                        initialValue={list?.length + 1}
                        disabled={true}
                        name='scPhaseNumber'
                        rules={[
                            { required: true, message: '请输入相位序号!' },
                            {
                                validator: (rule: any, value, callback) => {
                                    if (list.filter((e: any) => value === e?.scPhaseNumber)?.length >= 1) {
                                        callback([new Error('相位序号不能重复', rule?.field)])
                                    } else {
                                        callback()
                                    }
                                }
                            }
                        ]}
                        label='相位序号'
                    />
                    <ProFormText
                        name='scPhaseDescription'
                        label='相位描述'
                        rules={[{ required: true, message: '请输入相位描述!' }]}
                    />
                    <ProFormSelect
                        mode="multiple"
                        options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'].map((i) => { return { key: i, value: i, label: i } })}
                        name="scDirectionNumber"
                        label="流向序号"

                        rules={[{ required: true, message: '请输入流向序号!' }]}
                    />
                    <ProFormTextArea
                        name='scDirectionDescription'
                        label='流向描述'
                        rules={[{ required: true, message: '请输入流向描述!' }]}
                    />
                </Col> </Row>
        </ModalForm>
    );
}

export default PhaseModel;
