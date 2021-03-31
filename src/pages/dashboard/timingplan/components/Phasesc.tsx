/*
 * @Author: Dad
 * @Date: 2021-03-15 11:50:13
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-15 16:50:52
 */
import React,{useRef} from 'react';
import ProCard from '@ant-design/pro-card';
import PhaseModal from './PhaseModal';
import { Image, Card, Button } from 'antd'
import styles from './phase.less'
import {PhasescImg} from '@/components/graphic'
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';


const Phasesc: React.FC<any> = (props) => {
  const { phasescs, updatePhases, editPhase, setEdit } = props;
  const imgRefs = useRef<any>({});
  const onChange = (uid: any, status: any) => {
    imgRefs.current[uid] = status;
  };
  // 新增或者编辑逻辑
  const onAdd = (values: any) => {
    if (values.id){
      // 如果是修改
      const lists = phasescs.map((item: any) => {
        if(item?.id === values.id){
          return { ...item, ...values };
        }
        return item;
      })
      updatePhases(lists);
    }else{
      // 如果是新增
      const lists = phasescs.concat([values]);
      updatePhases(lists);
    }
  };
  return (
    <ProCard
      title="龙洲路-关公路路口"
      extra={
        <>
          <Button type="dashed" ghost onClick={()=>{setEdit({})}}>
            <PlusOutlined />
            添加相位
          </Button>
          <PhaseModal
            phasescs={phasescs}
            onAdd={onAdd}
            enableAdd={true}
            editPhase={editPhase}
            setEdit={setEdit}
          />
        </>
      }
    >
      <Card className={styles.rowCard}>
        <Image width={180} height={180} src="./phase.png" />
      </Card>
      {phasescs?.map((item: any) => {
        return (
          <Card className={styles.rowCard} key={item.id}>
            <div className={styles.phase}>
              <PhasescImg
                size={6}
                editable={false}
                uid={item.id}
                state={item.scDirectionNumber}
                onChange={onChange}
              ></PhasescImg>
            </div>
          </Card>
        );
      })}
    </ProCard>
  );
}

export default Phasesc;
