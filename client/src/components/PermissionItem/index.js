import React, { useState } from 'react';
import {
    List,
    Row,
    Col,
    Space,
    Divider,
    Button,
    Popconfirm,
    message,
} from 'antd';
import DescriptionItem from '../DescriptionItem';
import UpdatePermissionModal from '../UpdatePermissionModal';
import Service from '../../api/Service';

export default function (props) {
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const permission = props?.permission;
    const { _id, code, description, user } = permission;

    const handleOpenUpdateModal = () => {
        setIsUpdateModalVisible(true);
    };

    const handleCloseUpdateModal = (perm, isOk) => {
        if (isOk) {
            props.onUpdate(perm);
        }
        setIsUpdateModalVisible(false);
    };

    const handleDeletePermission = async (id) => {
        await Service.removePermission(id)
            .then((res) => {
                message.success(res.data.message);
                props.onRemove(id);
            })
            .catch((err) => {
                setIsAlertVisible(true);
                setAlertMessage(
                    err.response ? err.response.data.message : err.message
                );
            });
    };

    return (
        <List
            style={{
                width: window.innerWidth > 768 ? '50%' : '100%',
                padding: 20,
                marginBottom: 10,
            }}
            bordered
        >
            <List.Item.Meta
                title={
                    <p>
                        <strong>User: </strong>
                        {user?.firstName} {user?.lastName}
                    </p>
                }
                description={
                    <p>
                        <strong>Email: </strong>
                        {user?.email}
                    </p>
                }
                style={{ marginTop: 10 }}
            />
            <Space style={{ float: 'right', margin: '-5px 10px 10px 0' }}>
                <Popconfirm
                    title='Are you sure to delete this permission?'
                    onConfirm={() => handleDeletePermission(_id)}
                    okText='Yes'
                    cancelText='No'
                >
                    <Button type='primary' danger>
                        Delete
                    </Button>
                </Popconfirm>
                <Button onClick={handleOpenUpdateModal}>Update</Button>
            </Space>
            <Divider />
            <Row>
                <Col xs={{ span: 24 }}>
                    <DescriptionItem title='Code' content={code} />
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 24 }}>
                    <DescriptionItem
                        title='Description'
                        content={description}
                    />
                </Col>
            </Row>
            {isUpdateModalVisible && (
                <UpdatePermissionModal
                    visible={isUpdateModalVisible}
                    onClose={handleCloseUpdateModal}
                    id={_id}
                    user={user}
                    code={code}
                    description={description}
                />
            )}
        </List>
    );
}
