import React, { useEffect } from "react";
import { Table, Space, ConfigProvider } from "antd";
import { Button } from "react-bootstrap";

function EventTable(props) {
    const { Column } = Table;

    const data = props.items.map(item => {
        const dateTimeObject = new Date(item.effective_datetime);
        const dateTime = new Date(item.publishedAt);
        const formattedDateTime = dateTimeObject.toLocaleString();
        const formatDateTime = dateTime.toLocaleString();
        const score = item.full_marks == null ? 'None' : item.full_marks ;

        return {
            ...item,
            full_marks : score,
            effective_datetime: formattedDateTime,
            publishedAt: formatDateTime
        };
    });

    return (
        <ConfigProvider theme={{
            components: {
                Table: {
                    headerColor: '#0011ff',
                    lineWidth: 1,
                    lineHeight: 2,
                    headerBg: '#ebebeb',
                    headerBorderRadius: 30,
                    footerBorderRadius: 30,
                    borderColor: '#262626',
                    colorBgContainer: '#2b3035',
                    headerBg: '#252a2e',
                }
            }
        }}>
            <Table pagination={false} rowClassName='eventTable' bordered dataSource={data}>
                <Column
                    width='2%'
                    align='center'
                    title="ID"
                    dataIndex="id"
                    key="id" />
                <Column
                    width='20%'
                    align='center'
                    title="Title"
                    dataIndex="title"
                    key="title" />
                <Column
                    width='10%'
                    align='center'
                    title="Effective Datetime"
                    dataIndex="effective_datetime"
                    key="effective_datetime" />
                <Column
                    width='10%'
                    align='center'
                    title="Published Datetime"
                    dataIndex="publishedAt"
                    key="effective_datetime" />
                <Column
                    width='5%'
                    align='center'
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <>
                            <Space size="middle">
                                <Button variant="outline-danger" onClick={() => props.onDeleted(record.id)}>Delete</Button>
                                <Button variant="outline-info" onClick={() => props.onEdited(record)}>Edit</Button>
                            </Space>
                                
                        </>
                    )}
                />
                <Column
                    width='10%'
                    align='center'
                    title="Full Marks"
                    dataIndex="full_marks"
                    key="full_marks" />
            </Table>
        </ConfigProvider>
    );
}

export default EventTable;