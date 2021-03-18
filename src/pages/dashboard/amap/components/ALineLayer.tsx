import React from 'react'
import { LineLayer } from '@antv/l7-react';

const ALineLayer: React.FC<any> = (props) => {
   
    const {features} = props
    const data1 = {
      'type': 'FeatureCollection',
      'name': 'dl2',
      'crs': { 'type': 'name', 'properties': { 'name': 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
      'features': features
    }
    return (
      <LineLayer
        key={'21'}
        options={{
          autoFit: true,
        }}
        source={{
          data: data1
        }}
        size={{
          values: 1.8,
        }}
        color={{
          values: '#3fae1a',
        }}
        shape={{
          values: 'line',
        }}
        animate={{
          interval: 1, // 间隔
          duration: 1, // 持续时间，延时
          trailLength: 2 // 流线长度
        }}
      ></LineLayer>
    ) 
};


export default ALineLayer;