import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { TeamOutlined, UnorderedListOutlined } from '@ant-design/icons';

function Navbar() {
    const [currentItem, setCurrentItem] = useState('users');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/permissions') {
            setCurrentItem('permissions');
        }
    }, []);

    const selectMenuItemHandler = (e) => {
        setCurrentItem(e.key);
        navigate(`/${e.key}`);
    };

    const menuItems = [
        {
            label: 'Users',
            key: 'users',
            icon: <TeamOutlined />,
        },
        {
            label: 'Permissions',
            key: 'permissions',
            icon: <UnorderedListOutlined />,
        },
    ];
    return (
        <div>
            <Menu
                mode='horizontal'
                onClick={selectMenuItemHandler}
                selectedKeys={[currentItem]}
                items={menuItems}
            />
        </div>
    );
}

export default Navbar;
