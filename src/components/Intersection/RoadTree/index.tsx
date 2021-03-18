/*
 * @Author: Dad
 * @Date: 2021-03-08 16:20:04
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-11 10:10:06
 */
import React, { Component } from 'react';
import { Tree, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import BaseApi from '@/utils/BaseApi'
import _ from 'lodash';
import { AREAList } from '@/const'

export type Props = {
  onSelect?: (selectedKeys: any, e: any) => void;
};
class RoadTree extends Component<Props> {
  state = {
    treeData: [],
    trfcSlices: [],
    trfcSlice2s: [],
    trfcSlice: ''
  }
  async initTreeData(trfcSlice: any) {
    let url = "/api/biz/intersection/original-info/business"
    url = trfcSlice ? `${url}?trfcSlice=${trfcSlice}` : url
    const msg = await BaseApi(url).get()
    const tdata = msg?.data?.map((item: any, index: number) => {
      return {
        title: item.mainIntersectionName,
        key: `${index}-0`,
        children: item.intersectionDicTypeItemDTOList.map((item1: any) => { return { key: item1.intersectionCode, title: item1.displayName, item1 } })
      }
    })
    if (!trfcSlice) {
      let trfcSlices: any[] = []
      msg?.data?.forEach((item: any) => {
        trfcSlices = _.concat(trfcSlices, item.intersectionDicTypeItemDTOList);
      })
      this.setState({ trfcSlices })
    }

    this.setState({ treeData: tdata })
  }

  componentDidMount() {
    this.initTreeData(null)
  }

  onChangeType(val: any) {
    const { trfcSlices } = this.state
    this.setState({ trfcSlice: null, trfcSlice2s: _.uniq(trfcSlices.filter((e: any) => e.trfcSliceStatus === val).map((e: any) => e.trfcSlice)) })
  }

  render() {
    const { onSelect } = this.props
    const { treeData, trfcSlice2s, trfcSlice } = this.state
    return (
      <>
        <div>
          <Select
            allowClear
            style={{ width: '100%', marginBottom: '12px' }}
            placeholder="请选择"
            onChange={this.onChangeType.bind(this)}
          >
            {_.map(AREAList, (item, key) => (
              <Select.Option key={key} value={key}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div>
          <Select
            allowClear
            style={{ width: '100%', marginBottom: '12px' }}
            placeholder="请选择"
            onChange={(val) => {
              this.setState({ trfcSlice: val })
              this.initTreeData(val)
            }}
            value={trfcSlice}
          >
            {trfcSlice2s.map((item: any, index: number) => (<Select.Option key={index} value={item}>{item}</Select.Option>))}
          </Select>
        </div>
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandAll
          onSelect={onSelect}
          treeData={treeData}
        />
      </>
    );
  }
}
export default RoadTree;