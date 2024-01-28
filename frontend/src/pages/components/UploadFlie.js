import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, message, Upload } from 'antd';
import * as xlsx from 'xlsx';

export default function UploadFile(prop) {
    const [file, setFile] = useState()

    const readFile = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);
            prop.data(json)
        };
        reader.readAsArrayBuffer(file.originFileObj);
    };

    const props = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                setFile(info.file);
                readFile(info.file);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <ConfigProvider theme={{
            components: {
                Upload: {
                    colorText : 'rbga(255,255,255,.3)'
                }
            }
        }}>
            <Upload accept='.xlsx' {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </ConfigProvider >
    )
};