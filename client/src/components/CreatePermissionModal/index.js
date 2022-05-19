import React, { useEffect, useState } from 'react';
import {
    Modal,
    Form,
    Input,
    Row,
    Col,
    Button,
    Divider,
    Space,
    Alert,
    Spin,
    message,
    Collapse,
    Popconfirm,
} from 'antd';
import Service from '../../api/Service';
import DescriptionItem from '../DescriptionItem';
const { Panel } = Collapse;
const { TextArea } = Input;

function CreatePermissionModal(props) {
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userPermissions, setUserPermissions] = useState([]);
    const selectedUser = props?.selected;

    useEffect(() => {
        const fetchUserPermissions = async () => {
            await Service.getUsersPermission({ userId: selectedUser._id }).then(
                (res) => {
                    setUserPermissions(res.data.permissions);
                }
            );
        };

        fetchUserPermissions();
    }, []);

    const handleCreatePermission = async (values) => {
        setIsLoading(true);
        await Service.createPermission({ ...values, user: selectedUser._id })
            .then((res) => {
                message.success(res.data.message);
                props.onClose();
            })
            .catch((err) => {
                setIsAlertVisible(true);
                setAlertMessage(
                    err.response.data ? err.response.data.message : err.message
                );
            });
        setIsLoading(false);
    };

    const handleDeletePermission = async (id) => {
        await Service.removePermission(id)
            .then((res) => {
                let tmpPermdata = [...userPermissions];
                setUserPermissions(
                    tmpPermdata.filter((perm) => perm._id !== id)
                );
            })
            .catch((err) => {
                setIsAlertVisible(true);
                setAlertMessage(
                    err.response ? err.response.data.message : err.message
                );
            });
    };

    return (
        <Modal
            destroyOnClose={true}
            title='Create new permission'
            visible={props.visible}
            onCancel={props.onClose}
            footer={null}
            width={window.innerWidth > 768 && 800}
            maskStyle={{ overflow: 'hidden' }}
        >
            <Spin spinning={isLoading}>
                <Form
                    autoComplete='off'
                    onFinish={handleCreatePermission}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 23 }}
                >
                    {isAlertVisible && (
                        <Row>
                            <Col xl={{ span: 14, offset: 5 }}>
                                <Alert
                                    message='Error'
                                    description={alertMessage}
                                    type='error'
                                    showIcon
                                    closable
                                    afterClose={() => {
                                        setIsAlertVisible(false);
                                    }}
                                />
                                <br />
                            </Col>
                        </Row>
                    )}
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name='code'
                                label='Code'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter code',
                                    },
                                    { whitespace: true },
                                ]}
                                hasFeedback
                            >
                                <Input id='code' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name='description'
                                label='Description'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter description',
                                    },
                                    { whitespace: true },
                                ]}
                                hasFeedback
                            >
                                <TextArea rows={4} id='description' />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Collapse>
                        <Panel header='User permissions' key='1'>
                            {userPermissions.length === 0 ? (
                                <p>User has no created permission yet</p>
                            ) : (
                                userPermissions.map((perm) => {
                                    return (
                                        <div key={perm._id}>
                                            <Space
                                                style={{
                                                    float: 'right',
                                                    margin: '-5px 10px 10px 0',
                                                }}
                                            >
                                                <Popconfirm
                                                    title='Are you sure to delete this permission?'
                                                    onConfirm={() =>
                                                        handleDeletePermission(
                                                            perm._id
                                                        )
                                                    }
                                                    okText='Yes'
                                                    cancelText='No'
                                                >
                                                    <Button
                                                        type='primary'
                                                        danger
                                                    >
                                                        Delete
                                                    </Button>
                                                </Popconfirm>
                                            </Space>
                                            <Row>
                                                <Col xs={{ span: 24 }}>
                                                    <DescriptionItem
                                                        title='Code'
                                                        content={perm.code}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={{ span: 24 }}>
                                                    <DescriptionItem
                                                        title='Description'
                                                        content={
                                                            perm.description
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                            <Divider />
                                        </div>
                                    );
                                })
                            )}
                        </Panel>
                    </Collapse>

                    <Divider />
                    <Row justify='end'>
                        <Space size='small'>
                            <Button onClick={props.onClose}>Cancel</Button>
                            <Button type='primary' htmlType='submit'>
                                Create
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Spin>
        </Modal>
    );
}

export default CreatePermissionModal;
