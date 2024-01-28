import React, { useEffect, useState } from 'react';
import { ConfigProvider, Table, Space,Button } from 'antd';
import moment from 'moment';

export default function EventEntryTable({ item,onDeleted }) {
    const columns = [
        {
            title: 'Student',
            dataIndex: 'student_name',
        },
        {
            title: 'Result',
            dataIndex: 'result',
            sorter: true
        },
        {
            title: 'Seen Datetime',
            dataIndex: 'seen_datetime',
            sorter: true
        },
        {
            title: 'Accept Datetime',
            dataIndex: 'accept_datetime',
            sorter: true
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" danger onClick={() => onDeleted(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];
    
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    for (const i of item) {
        if (i.accept_datetime == null) {
            i.accept_datetime = 'Not accept yet'
        }
        else if (i.seen_datetime == null) {
            i.seen_datetime = 'Not seen yet'
        }   
    }

    for (const i of item) {
        if (i.accept_datetime !== 'Not accept yet') {
            if (i.accept_datetime) {
                i.accept_datetime = moment(i.accept_datetime).format('DD/MM/YYYY HH:mm:ss');
            }
        }
        if (i.seen_datetime !== 'Not seen yet') {
            if (i.seen_datetime) {
                i.seen_datetime = moment(i.seen_datetime).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    }

    return (
        <ConfigProvider
            theme={{
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
                        bodySortBg: '#53705b'
                    },
                },
            }}
        >
            <Table rowClassName='eventTable' pagination={false} columns={columns} bordered dataSource={item} onChange={onChange} />
        </ConfigProvider>
    );
}