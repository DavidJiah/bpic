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

const Comp: React.FC<any> = ({ }) => {
  const [road, setRoad] = useState<any>();

  return (
    <>
      <GridContent>
        <ProCard split="vertical" className={styles.bg}>
          <ProCard title="益阳市" colSpan="260px" className={styles.bg}>
            <RoadTree onSelect={(_: any, e: any) => e?.node?.item1 && setRoad(e?.node?.item1)} />
          </ProCard>
          <ProCard className={styles.bg}>
            {road && <Edit roadInfo={road} />}
          </ProCard>
        </ProCard>
      </GridContent>
    </>
  );
}

export default connect(({ }: any) => ({
}))(Comp);