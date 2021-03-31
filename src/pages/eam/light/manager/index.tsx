/*
 * @Author: Dad
 * @Date: 2021-03-11 22:28:21
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-15 15:16:52
 */
import { connect } from 'umi';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { GridContent } from '@ant-design/pro-layout';
import RoadTree from '@/components/Intersection/RoadTree'
import ProCard from '@ant-design/pro-card';
import styles from './index.less'
import Edit from './edit'
import { message } from 'antd';

const Comp: React.FC<any> = ({ }) => {
  const [intersectionId, setIntersectionId] = useState<string>('');
  const [intersectionTitle, setIntersectionTitle] = useState<string>('请先选择路口');

  // 点击树
  const onSelect = (selectedKeys: any, e: any) => {
    if (e.node.item1) {
      if (e.node.item1.intersectionId) {
        setIntersectionTitle(`${e.node.item1.trfcSlice}-${e.node.item1.intersectionName}`);
        setIntersectionId(e.node.item1.intersectionId);
      } else {
        message.warning('请先为该路口建档');
      }
    }
  };

  return (
    <>
      <GridContent>
        <ProCard split="vertical" className={styles.bg}>
          <ProCard title="益阳市" colSpan="260px" className={styles.bg}>
            <RoadTree onSelect={onSelect} />
          </ProCard>
          <ProCard className={styles.bg} title={intersectionTitle}>
            {intersectionId && <Edit roadInfo={intersectionId} intersectionId={intersectionId} />}
          </ProCard>
        </ProCard>
      </GridContent>
    </>
  );
}

export default connect(({ }: any) => ({
}))(Comp);