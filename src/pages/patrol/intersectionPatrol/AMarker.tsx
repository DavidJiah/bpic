/*
 * @Author: Dad
 * @Date: 2021-03-17 09:32:58
 * @LastEditTime: 2021-03-17 19:01:25
 * @LastEditors: Dad
 * @Description:
 */
import React from 'react';
import { Marker, PointLayer } from '@antv/l7-react';
import { Popover } from 'antd';

const AMarker: React.FC<any> = (props) => {
  const { list, onAdd } = props;

  const plist = list.map((item: any) => {
    return {
      controlPlan: item.controlPlan,
      centroid: item.lnglat,
      countryName: item.title,
      countryEnglishName: 'Algeria',
      currentConfirmedCount: 1059,
      confirmedCount: 1251,
      suspectedCount: 0,
      curedCount: 62,
      deadCount: 130,
    };
  });
  return (
    <>
      {list.map(({ title, lnglat, id }: any, index: any) => (
        <Marker key={index} lnglat={lnglat}>
          <div className="markerContent">
            <div style={{ color: '#fff', fontSize: '12px' }}>
              <Popover placement="topLeft" content={title}>
                <svg
                  onClick={() => {
                    onAdd({ title, intersectionId: id, lnglat });
                  }}
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1131"
                  width="26"
                  height="26"
                >
                  <path
                    d="M512 2.094c-215.035 0-389.354 174.32-389.354 389.355 0 40.969 6.327 80.459 18.059 117.548C190.547 666.579 512 1021.906 512 1021.906S833.452 666.58 883.295 508.999c11.732-37.09 18.059-76.581 18.059-117.551C901.354 176.414 727.034 2.094 512 2.094z m0 541.388c-83.966 0-152.034-68.068-152.034-152.034S428.034 239.414 512 239.414s152.034 68.068 152.034 152.034S595.966 543.482 512 543.482z"
                    p-id="1132"
                    fill="#1296db"
                  ></path>
                </svg>
              </Popover>
            </div>
          </div>
        </Marker>
      ))}
      <PointLayer
        key="p2"
        source={{
          data: plist,
          parser: {
            type: 'json',
            coordinates: 'centroid',
          },
        }}
        scale={{
          values: {
            confirmedCount: {
              type: 'log',
            },
          },
        }}
        color={{
          values: '#1396db',
        }}
        shape={{
          values: 'circle',
        }}
        active={{
          option: {
            color: '#5b8ff9',
          },
        }}
        size={{
          field: 'confirmedCount',
          values: [5, 100],
        }}
        animate={{
          enable: true,
        }}
        style={{
          opacity: 0.6,
        }}
      />
    </>
  );
};

export default AMarker;
