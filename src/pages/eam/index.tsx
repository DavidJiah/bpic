/*
 * @Author: Dad
 * @Date: 2021-03-08 16:20:04
 * @LastEditors: Dad
 * @LastEditTime: 2021-03-11 10:21:22
 */
import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import { EAM_MENU_LIST } from '@/const'

interface SearchProps {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
}

class Search extends Component<SearchProps> {
  handleTabChange = (key: string) => {
    const { match } = this.props;
    const url = match.url === '/' ? '' : match.url;
    history.push(`${url}/${key}`);

  };

  getTabKey = () => {
    const { match, location } = this.props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'articles';
  };

  render() {
    const { children } = this.props;
    return (
      <PageContainer
        title={false}
        tabList={EAM_MENU_LIST}
        tabActiveKey={this.getTabKey()}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageContainer>
    );
  }
}

export default Search;
