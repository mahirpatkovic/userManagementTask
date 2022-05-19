import React, { useState } from 'react';
import { Table, Tag, Space, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    PlusCircleOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import CreatePermissionModal from '../CreatePermissionModal';
import Service from '../../api/Service';
import ErrorNotification from '../ErrorNotification';

function UsersTable(props) {
    const [isCreatePermissionModalVisible, setIsCreatePermissionModalVisible] =
        useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const users = props?.users;
    const totalUsers = props?.totalUsers;
    const perPageUsers = props?.perPageUsers;

    const navigate = useNavigate();

    const handleOpenCreatePermissionModal = (user) => {
        setSelectedUser(user);
        setIsCreatePermissionModalVisible(true);
    };

    const handelCloseCreatePermissionModal = () => {
        setIsCreatePermissionModalVisible(false);
        setSelectedUser(null);
    };

    const handleRemoveUser = async (id) => {
        await Service.removeUser(id)
            .then((res) => {
                message.success(res.data.message);
                props.onRemoveUser(id);
            })
            .catch((err) => {
                setIsAlertVisible(true);
                setAlertMessage(
                    err.response ? err.response.data.message : err.message
                );
            });
    };

    const usersColumns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) => (
                <>
                    {status ? (
                        <Tag color='green'>Active</Tag>
                    ) : (
                        <Tag color='red'>Inactive</Tag>
                    )}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            ellipsis: true,
            align: 'center',
            render: (_, record) => (
                <Space size='middle'>
                    <Button
                        shape='circle'
                        icon={<PlusCircleOutlined />}
                        onClick={() => handleOpenCreatePermissionModal(record)}
                    />
                    <Button
                        shape='circle'
                        icon={<EditOutlined />}
                        onClick={() => navigate(`/users/${record._id}`)}
                    />
                    <Popconfirm
                        title='Are you sure you want to delete this user?'
                        onConfirm={() => handleRemoveUser(record._id)}
                        okText='Yes'
                        cancelText='No'
                    >
                        <Button shape='circle' icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const onChangeTableHandler = (page, perPage) => {
        props.onTableChange(page, perPage);
    };

    return (
        <div>
            {isAlertVisible && (
                <ErrorNotification alertMessage={alertMessage} />
            )}
            <Table
                rowKey='_id'
                dataSource={users}
                loading={props?.isLoading}
                scroll={{ x: 600 }}
                columns={usersColumns}
                rowClassName='row'
                pagination={{
                    total: totalUsers,
                    defaultPageSize: perPageUsers,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '15', '20'],
                    onChange: (page, pageSize) =>
                        onChangeTableHandler(page, pageSize),
                }}
            />
            {isCreatePermissionModalVisible && (
                <CreatePermissionModal
                    visible={isCreatePermissionModalVisible}
                    onClose={handelCloseCreatePermissionModal}
                    selected={selectedUser}
                />
            )}
        </div>
    );
}

export default UsersTable;
