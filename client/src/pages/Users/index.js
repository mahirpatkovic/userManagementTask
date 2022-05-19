import React, { useEffect, useState } from 'react';
import Service from '../../api/Service';
import UsersTable from '../../components/UsersTable';
import { Button, notification, Select, Space } from 'antd';
import './style.css';
import CreateUserModal from '../../components/CreateUserModal';
import ErrorNotification from '../../components/ErrorNotification';

const { Option } = Select;

function Users() {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [pageNumber, setPageNumber] = useState(Number(0));
    const [perPageUsers, setPerPageUsers] = useState(Number(10));
    const [sortValue, setSortValue] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [isCreateUserModalVisible, setIsCreateUserModalVisible] =
        useState(false);

    useEffect(() => {
        fetchUsersHandler(
            pageNumber,
            perPageUsers,
            sortValue,
            sortOrder,
            userStatus
        );
    }, []);

    const fetchUsersHandler = async (
        page,
        perPage,
        sortVal,
        sortOrd,
        status
    ) => {
        setIsLoading(true);
        await Service.getUsers({
            page,
            perPage,
            sortVal,
            sortOrd,
            status,
        })
            .then((res) => {
                setUsers(res.data.users);
                setTotalUsers(res.data.totalUsers);
            })
            .catch((err) => {
                setAlertMessage(
                    err.response.data ? err.response.data.message : err.message
                );
                setIsAlertVisible(true);
            });
        setIsLoading(false);
    };

    const tableChangeHandler = (page, perPage) => {
        setPageNumber(page - 1);
        setPerPageUsers(perPage);
        fetchUsersHandler(page - 1, perPage, sortValue, sortOrder, userStatus);
    };

    const onChangeSelectHandler = (value) => {
        setSortValue(value);
    };

    const onChangeSelectOrder = (value) => {
        setSortOrder(value);
    };

    const onChangeUserStatus = (value) => {
        setUserStatus(value);
    };

    const onFilterUsersHandler = () => {
        fetchUsersHandler(
            pageNumber,
            perPageUsers,
            sortValue,
            sortOrder,
            userStatus
        );
    };

    const resetFiltersHandler = () => {
        setPageNumber(0);
        setPerPageUsers(10);
        setSortValue('');
        setSortOrder('');
        setUserStatus('');
        fetchUsersHandler(0, 10, '', '', '');
    };

    const handleOpenCreateUserModal = () => {
        setIsCreateUserModalVisible(true);
    };

    const handelCloseCreateUserModal = (newUser, isOk) => {
        if (isOk) {
            let tmpUsers = users;
            tmpUsers.push(newUser);
            setUsers([...tmpUsers]);
        }
        setIsCreateUserModalVisible(false);
    };

    const handleRemoveUser = (id) => {
        let tmpUsers = [...users];
        setUsers(tmpUsers.filter((user) => user._id !== id));
    };

    return (
        <div className='usersPage'>
            {isAlertVisible && (
                <ErrorNotification alertMessage={alertMessage} />
            )}
            <Button onClick={handleOpenCreateUserModal} style={{ margin: 10 }}>
                Create new user
            </Button>
            <br />
            <Space size='middle' style={{ margin: 10 }}>
                <Select
                    placeholder='Select to sort'
                    onChange={onChangeSelectHandler}
                    value={sortValue}
                    style={{ width: 150 }}
                >
                    <Option value='firstName'>First name</Option>
                    <Option value='lastName'>Last name</Option>
                    <Option value='username'>Username</Option>
                    <Option value='email'>Email</Option>
                </Select>
                <Select
                    placeholder='Select sort order'
                    onChange={onChangeSelectOrder}
                    value={sortOrder}
                    style={{ width: 150 }}
                >
                    <Option value='asc'>Ascending</Option>
                    <Option value='desc'>Descending</Option>
                </Select>
                <Select
                    placeholder='Select status'
                    onChange={onChangeUserStatus}
                    value={userStatus}
                    style={{ width: 150 }}
                >
                    <Option value='active'>Active</Option>
                    <Option value='inactive'>Inactive</Option>
                </Select>
                <Button type='primary' onClick={onFilterUsersHandler}>
                    Filter
                </Button>
                <Button onClick={resetFiltersHandler}>Reset filters</Button>
            </Space>

            <UsersTable
                users={users}
                totalUsers={totalUsers}
                isLoading={isLoading}
                pageNumber={pageNumber}
                perPageUsers={perPageUsers}
                onTableChange={tableChangeHandler}
                onRemoveUser={handleRemoveUser}
            />
            {isCreateUserModalVisible && (
                <CreateUserModal
                    visible={isCreateUserModalVisible}
                    onClose={handelCloseCreateUserModal}
                />
            )}
        </div>
    );
}

export default Users;
