import React from 'react';
import { Tabs } from 'antd';
import { history } from 'umi';

const { TabPane } = Tabs;
export type TabPaneObj = {
    tab: string;
    key: string;
}

export type TabHeaderProps = {
    activeKey: string;
    list: TabPaneObj[];
};
const TabHeader: React.FC<TabHeaderProps> = (props) => {

    const { activeKey, list } = props;
    const onChange = (e) => {
        history.push(e)
    }

    return (
        <>
            <Tabs defaultActiveKey={activeKey} onChange={onChange}>
                {list.map(item => (<TabPane tab={item.tab} key={item.key} />))}
            </Tabs>
        </>
    );
}
export default TabHeader;