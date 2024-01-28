import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, DatePicker, Input, InputNumber,message } from 'antd';
import dayjs from 'dayjs';

const EventEdit = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [time, setTime] = useState();

    useEffect(() => {
        if (props.item) {
            setTime(dayjs(props.item.effective_datetime, 'D/M/YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss'))
            setIsModalOpen(true)
        }
    }, [props.item])

    const handleOk = () => {
        setIsModalOpen(false);
        form.validateFields().then(formData => {
            props.confirm({ ...formData })
        })
    };

    const onFinish = (values) => {
        props.confirm({ ...props.item,...values })
        setIsModalOpen(false)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (props.item) {
            form.setFieldsValue({
                title: props.item.title,
                full_marks: props.item.full_marks,
                effective_datetime: dayjs(time, 'DD-MM-YYYY HH:mm:ss')
            })
        }
    },)

    return (
        <>
            <Modal title="Edit event"
                open={isModalOpen}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                onOk={handleOk}
                onCancel={handleCancel}
            >
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
                    onFinish={onFinish}
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
                        <Input
                            style={{
                                width: '75%',
                            }} />
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
                        <InputNumber />
                    </Form.Item>

                    <Form.Item name="effective_datetime" label="Effective">
                        <DatePicker
                            showTime
                        />
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
            </Modal >
        </>
    );
};
export default EventEdit;