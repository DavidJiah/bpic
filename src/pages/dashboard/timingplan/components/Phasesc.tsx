/*
 * @Author: Dad
 * @Date: 2021-03-15 11:50:13
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-15 16:50:52
 */
import React from 'react';
import ProCard from '@ant-design/pro-card';
import PhaseModal from './PhaseModal';
import { Image, Card, Tag } from 'antd'
import styles from './phase.less'
import _ from 'lodash';

const { Meta } = Card;
const Phasesc: React.FC<any> = (props) => {

    const { phasescs, updatePhases } = props
    const onAdd = (values: any) => {
        const lists = _.orderBy(phasescs.concat([values]), 'scPhaseNumber');
        updatePhases(lists)
    }
    return (
        <ProCard gutter={8} title="龙洲路-关公路路口" extra={<PhaseModal list={phasescs} onAdd={onAdd} />} >
            <ProCard colSpan={{ xl: '286px', }} bordered layout="center" >
                <Image width={280} src="./phase.png" />
            </ProCard>
            <ProCard bordered>
                {_.map(phasescs, (item: any, index: number) => (
                    <Card className={styles.rowCard}
                        key={index}
                        cover={<div style={{ height: '80px', textAlign: 'center', lineHeight: '80px' }}>图片开发中</div>}>
                        <Meta title={(<Tag color="blue">{item.scPhaseNumber}</Tag>)} description={item.scDirectionDescription} />
                    </Card>
                ))}
            </ProCard>
        </ProCard>
    );
}

export default Phasesc;
