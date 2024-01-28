import React from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    ConfigProvider,
    message
} from 'antd';


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 9,
        },
    },
    wrapperCol: {
        xs: {
            span: 29,
        },
        sm: {
            span: 20,
        },
    },
};


const PostNewsForm = (props) => {
    const [form] = Form.useForm();

    return <ConfigProvider theme={{
        components: {
            Form: {
                labelColor: 'rgba(255,255,255,1)'
            }
        }
    }}>
        <Form
            {...formItemLayout}
            variant="filled"
            style={{
                maxWidth: 600,
            }}
            onFinish={(data) => {
                props.onSummit(data);
                message.success(`Announcement has been posted`);
            }}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Infomation"
                name="information"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Image URL"
                name="imgURL"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="DatePicker"
                name="datetime"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 6,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </ConfigProvider>
}


export default PostNewsForm;