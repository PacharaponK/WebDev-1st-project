import React, { useState } from 'react';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

function DropdownEvent(props) {
    const [menu,setMenu] = useState('Select');

    const handleMenuClick = (e) => {
        setMenu(e.key)
        message.info(`Clicked on ${e.key}`);
        console.log('click', e);
        props.menuClicked(e.key);
    };

    const items = [
        {
            label: 'All Event',
            key: 'All Event',
            icon: <UserOutlined />,
        },
        {
            label: 'Your Event',
            key: 'Your Event',
            icon: <UserOutlined />,
        },
    ];
    const menuProps = {
        items,
        selectable: true,
        onClick: handleMenuClick,
    };

    return (
        <Dropdown menu={menuProps}>
            <Button>
                <Space>
                    {menu}
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    );
}
export default DropdownEvent;