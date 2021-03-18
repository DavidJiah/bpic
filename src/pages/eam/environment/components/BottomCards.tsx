
import React from 'react'
import styles from './BottomCard.less'
import { Drawer, Card, Image, Typography, Button, Popconfirm } from 'antd'

const { Paragraph } = Typography;
const BottomCard: React.FC<any> = (props: any) => {
    const { list, visible, onClose, title, onDelete, onEdit } = props
    
    const handleDelete = (item: any) => onDelete(item.intIntersectionId, item.id)

    return (
        <Drawer
            headerStyle={{ padding: "12px 8px", border: '0' }}
            bodyStyle={{ padding: "0", overflow: 'hidden', display: 'flex' }}
            title={(<span><svg style={{ verticalAlign: "bottom" }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4244" width="24" height="24"><path d="M592.742 758.835l142.797-191.18 0.512-0.769a281.6 281.6 0 0 0 60.98-176.025 285.03 285.03 0 1 0-570.061 0 281.6 281.6 0 0 0 60.979 176.025l0.512 0.768 142.797 191.181c-68.762 7.322-153.088 26.931-153.088 79.155 0 79.412 194.56 83.456 233.83 83.456s233.83-4.044 233.83-83.456c0-52.224-84.326-71.833-153.088-79.155zM395.11 396.75A116.89 116.89 0 1 1 512 513.587 116.992 116.992 0 0 1 395.11 396.75zM512 860.16c-78.694 0-133.94-11.827-159.693-22.016 21.453-8.448 63.437-18.074 122.368-21.043l12.698 16.998a30.72 30.72 0 0 0 49.254 0l12.698-16.998c58.931 2.97 100.915 12.595 122.368 21.043C645.939 848.179 590.694 860.16 512 860.16z" p-id="4245" fill="#1296db"></path><path d="M567.45 396.749a55.45 55.45 0 1 1-55.45-55.45 55.5 55.5 0 0 1 55.45 55.45z" p-id="4246" fill="#1296db"></path></svg><span>{title}（{list.length}）</span></span>)}
            placement='bottom'
            visible={visible}
            key='bottom'
            height='296px'
            getContainer={false}
            style={{ position: 'absolute' }}
            onClose={onClose}
            className={styles.cardsContent}
        >

            {list.map((item: any, index: number) => (
                <Card
                    key={index}
                    size="small"
                    bordered={true}
                    headStyle={{ minHeight: '32px', lineHeight: '32px' }}
                    bodyStyle={{ height: '184px'}}
                    title={<div><span className={styles.title}>{item.entranceExitDirection}</span><span>{item.distance}米</span></div>}
                    extra={
                     <div>
                        <Popconfirm key="del" title="是否确定删除?" 
                            onConfirm={ async () => { handleDelete(item) }}>
                            <Button type="text" onClick={() => { }} >删除</Button>
                        </Popconfirm>
                        <Button type="text" onClick={() => { onEdit(item) }} >编辑</Button></div>}
                    className={styles.bottom_card}>
                    <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>{item.intEnvFactorDescription}</Paragraph>
                    {item.fileList&&item.fileList.map((item1: any,index: number)=>
                        <Image width={120} 
                            key={index}
                            className={styles.img}
                            src={item1.url}
                            preview={{ src: item1.url}}
                        />)
                    }
                </Card>
            ))}
        </Drawer>
    )
}

export default BottomCard
