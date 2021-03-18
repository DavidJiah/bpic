/*
 * @Author: Dad
 * @Date: 2021-03-11 10:28:28
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-12 11:06:36
 */
import { Menu, Dropdown, Modal, List, Card, Image } from 'antd';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import styles from './index.less';
import _ from 'lodash'
import { FILE_MANAGER_TYPE, FILE_MANAGER_TYPE_1, FILE_MANAGER_TYPE_2, FILE_MANAGER_TYPE_3, FILE_MANAGER_TYPE_4, FILE_MANAGER_TYPE_5 } from '@/const'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import FILE from '@/assets/file.png'
import GlobalUpload from '@/components/GlobalUpload';

interface FileProps {
  dispatch: any;
  loading: boolean;
  list: any;
  businessId: string | number;
}

export const File: FC<FileProps> = ({ dispatch, loading, list, businessId }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>({});

  useEffect(() => {
    if (_.isEmpty(businessId)) return;
    initList()
  }, [businessId]);

  /**
   * @name: 列表加载
   */
  const initList = () => {
    setInitialValues({ ...initialValues, id: businessId })
    dispatch({
      type: 'imageManage/fetch',
      payload: {
        conditions: [
          {
            column: "businessType",
            option: "in",
            valueList: [
              FILE_MANAGER_TYPE_1,
              FILE_MANAGER_TYPE_2,
              FILE_MANAGER_TYPE_3,
              FILE_MANAGER_TYPE_4,
              FILE_MANAGER_TYPE_5,
            ]
          },
          {
            column: "businessId",
            option: businessId,
          },
        ],
        size: '-1'
      }
    })
  }

  const menu = (
    <Menu>
      {_.map(FILE_MANAGER_TYPE, item => (<Menu.Item key={item} onClick={(e) => { setVisible(true); setInitialValues({ ...initialValues, businessType: e?.key }) }}>{item}</Menu.Item>))}
    </Menu>
  );

  return (
    <div className={styles.filterCardList}>
      <div style={{ marginBottom: '20px' }}>
        <Dropdown.Button type="dashed" overlay={menu}>上传文件</Dropdown.Button>
      </div>
      <List
        grid={{ gutter: 6, column: 6 }}
        dataSource={_.uniqBy(list.records, 'businessType')}
        renderItem={(item: any) => (
          <List.Item>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
            >
              <div className={styles.cardItemContent}>
                <div className={styles.cardInfo}>
                  <Image
                    width={'40px'}
                    height={'40px'}
                    src={FILE}
                  />
                  <span style={{ marginTop: 10 }}>{item?.businessType}</span>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title={initialValues?.businessType}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
        <GlobalUpload
          initialValues={initialValues}
          onChange={(e: any) => { }}
          type="big"
        />
      </Modal>
    </div>
  );
};

export default connect(({ imageManage: imageManage, loading }: any) => ({
  list: imageManage?.list,
  loading: loading.effects['imageManage/fetchList'],
}))(File);