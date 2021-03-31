/*
 * @Author: Dad
 * @Date: 2021-03-11 10:28:28
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-23 14:22:35
 */
import { Menu, Dropdown, List, Card, Image } from 'antd';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import styles from './index.less';
import {
  IMAGE_MANAGER_TYPE,
  IMAGE_MANAGER_TYPE_1,
  IMAGE_MANAGER_TYPE_2,
  IMAGE_MANAGER_TYPE_3,
  IMAGE_MANAGER_TYPE_4,
  IMAGE_MANAGER_TYPE_5,
  IMAGE_MANAGER_TYPE_6,
  IMAGE_MANAGER_TYPE_7,
} from '@/const';
import _ from 'lodash';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ImgUpload from './ImgUpload';

interface ImagesProps {
  dispatch: any;
  loading: boolean;
  list: any;
  businessId: any;
  location: any;
}

const CardInfo: React.FC<{
  imgId: string;
  desc: string;
}> = ({ imgId, desc }) => (
  <div className={styles.cardInfo}>
    <Image width={'100%'} height={'180px'} src={process.env.IMAGE_URL + imgId} />
    <span style={{ marginTop: 10 }}>{desc}</span>
  </div>
);

export const Images: FC<ImagesProps> = ({ dispatch, loading, list, businessId, location }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>({});

  useEffect(() => {
    if (_.isEmpty(businessId) && _.isEmpty(location?.query?.businessId)) return;
    initList();
  }, [businessId]);

  /**
   * @name: 列表加载
   */
  const initList = () => {
    setInitialValues({ ...initialValues, id: businessId || location?.query?.businessId });
    dispatch({
      type: 'imageManage/fetch',
      payload: {
        conditions: [
          {
            column: 'businessType',
            option: 'in',
            valueList: [
              IMAGE_MANAGER_TYPE_1,
              IMAGE_MANAGER_TYPE_2,
              IMAGE_MANAGER_TYPE_3,
              IMAGE_MANAGER_TYPE_4,
              IMAGE_MANAGER_TYPE_5,
              IMAGE_MANAGER_TYPE_6,
              IMAGE_MANAGER_TYPE_7,
            ],
          },
          {
            column: 'businessId',
            option: businessId,
          },
        ],
        size: '-1',
      },
    });
  };

  const menu = (
    <Menu>
      {_.map(IMAGE_MANAGER_TYPE, (item, key) => (
        <Menu.Item
          key={key}
          onClick={(e) => {
            setVisible(true);
            setInitialValues({ ...initialValues, businessType: e?.key });
          }}
        >
          {item}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={styles.filterCardList}>
      <div style={{ marginBottom: '20px' }}>
        <Dropdown.Button type="dashed" overlay={menu}>
          上传图片
        </Dropdown.Button>
      </div>
      <List
        grid={{ gutter: 20, column: 3 }}
        dataSource={_.uniqBy(list.records, 'businessType')}
        renderItem={(item: any) => (
          <List.Item>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              actions={[
                <a
                  onClick={() =>
                    history.push({
                      pathname: '/eam/fileAndImg/edit',
                      query: { businessType: item?.businessType, businessId: businessId },
                    })
                  }
                >
                  <EditOutlined /> 编 辑{' '}
                </a>,
                <a>
                  <DeleteOutlined /> 删 除{' '}
                </a>,
              ]}
            >
              <Card.Meta
                description={`更新时间: ${item?.updateTime}`}
                title={item?.businessType}
                className={styles.setTime}
              />
              <div className={styles.cardItemContent}>
                <CardInfo imgId={item?.id} desc={'暂定'} />
              </div>
            </Card>
          </List.Item>
        )}
      />
      <ImgUpload
        visible={visible}
        initialValues={initialValues}
        closeModal={() => setVisible(false)}
      />
    </div>
  );
};

export default connect(({ imageManage: imageManage, loading }: any) => ({
  list: imageManage?.list,
  loading: loading.effects['imageManage/fetchList'],
}))(Images);
