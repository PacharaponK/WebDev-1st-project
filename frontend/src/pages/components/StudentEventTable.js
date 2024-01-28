import { Table, Space, ConfigProvider, Col, Row } from "antd";
import { Button } from "react-bootstrap";

export default function StudentEventTable(props) {
    const { Column } = Table;

    const data = props.items.map(item => {
        const dateTimeObject = new Date(item.effective_datetime);
        const formattedDateTime = dateTimeObject.toLocaleString();

        return {
            ...item,
            effective_datetime: formattedDateTime,
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
                {/* <Column
                    width='5%'
                    align='center'
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button variant="outline-danger" onClick={() => props.onDeleted(record.id)}>Delete</Button>
                        </Space>
                    )}
                /> */}
            </Table>
        </ConfigProvider>
    );
}