import React from 'react';
import { Button, DatePicker, ConfigProvider, Form, Input, InputNumber } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};


function PostEventForm(props) {
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
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your event title!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Full Marks"
                    name="full_marks"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your full marks!",
                        },
                    ]}

                >
                    <InputNumber
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item name="effective_datetime" label="Effective" {...config}>
                    <DatePicker showTime />
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

export default PostEventForm;