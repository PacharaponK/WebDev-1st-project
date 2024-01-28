import React from 'react';
import { Button, Select, ConfigProvider, Form, Input } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


function PostEntryForm(props) {
    const [form] = Form.useForm();

    return (
        <ConfigProvider theme={{
            components: {
                Form: {
                    labelColor: 'rgba(255,255,255,1)'
                }
            }
        }}>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 7,
                }}
                wrapperCol={{
                    span: 18,
                }}
                style={{
                    maxWidth: 1000,
                }}
                onFinish={(data) => {
                    props.onSummit(data);
                    form.resetFields();
                }}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Student"
                    name="studentID"
                    rules={[
                        {
                            required: true,
                            message: "Please select your student!",
                        },
                    ]}>
                    <Select>
                        {props.student.map((i) => (
                            <Select.Option value={i.id} key={i.username}>
                                {i.username}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Result"
                    name="result"
                    rules={[
                        {
                            required: true,
                            message: "Please enter student's result!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Event"
                    name="eventID"
                    rules={[
                        {
                            required: true,
                            message: "Please select an event!",
                        },
                    ]}>
                    <Select>
                        {props.item.map((i) => (
                            <Select.Option value={i.id} key={i.title}>
                                {i.title}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 7,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </ConfigProvider>
    );
}

export default PostEntryForm;