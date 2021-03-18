/*
 * @Author: Dad
 * @Date: 2021-03-08 16:20:04
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-15 14:42:12
 */
import React, { useEffect, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import styles from './style.less';
import { GridContent } from '@ant-design/pro-layout';
import RoadTree from '@/components/Intersection/RoadTree';
import File from './file/management';
import Image from './image/management';
import { Radio } from 'antd';

interface FileAndImgProps { }

const Comp: React.FC<FileAndImgProps> = () => {
  const [manage, setManage] = useState<string>('image')
  const [businessId, setBusinessId] = useState<any>('');

  return (
    <GridContent>
      <React.Fragment>
        <ProCard split="vertical" className={styles.bg}>
          <ProCard title="益阳市" colSpan="260px" className={styles.bg}>
            <RoadTree onSelect={(_: any, e: any) => e?.node?.item1?.intersectionCode && setBusinessId(e?.node?.item1?.intersectionCode)} />
          </ProCard>
          <ProCard className={styles.bg}>
            <Radio.Group onChange={(e) => setManage(e.target.value)} defaultValue="image">
              <Radio.Button value="image">图片管理</Radio.Button>
              <Radio.Button value="file">文件管理</Radio.Button>
            </Radio.Group>
            <div style={{ margin: '20px 0' }}>
              {manage == 'image' ? <Image businessId={businessId} /> : <File businessId={businessId} />}
            </div>
          </ProCard>
        </ProCard>
      </React.Fragment>
    </GridContent>
  )
}

export default Comp;
