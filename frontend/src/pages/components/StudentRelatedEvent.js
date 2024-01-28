import { Table, Space, ConfigProvider } from "antd";
import { Button } from "react-bootstrap";

export default function StudentRelatedEventTable(props) {
    const { Column } = Table;

    const data = props.items
        .filter(item => item.entry)
        .map(item => {
            const dateTimeObject = new Date(item.effective_datetime);
            const formattedDateTime = dateTimeObject.toLocaleString();
            return {
                ...item,
                effective_datetime: formattedDateTime,
                result : item.entry.result
            }
        });

    const handleFooter = () => {
        {return <Button href="/student/entry/#" size="sm" variant="outline-info">Status</Button>}
    }

    console.log(data);

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
            <Table pagination={false} rowClassName='eventTable' bordered dataSource={data} footer={handleFooter}>
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
                    width='7%'
                    align='center'
                    title="Result"
                    dataIndex="result"
                    key="result" />
            </Table>
        </ConfigProvider>
    );
}