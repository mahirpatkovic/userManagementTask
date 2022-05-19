import React, { useState } from 'react';
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
} from 'antd';
import Service from '../../api/Service';

function CreateUserModal(props) {
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateUser = async (user) => {
        setIsLoading(true);
        await Service.createUser(user)
            .then((res) => {
                const { newUser } = res.data;
                props.onClose(newUser, true);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsAlertVisible(true);
                setAlertMessage(
                    err.response.data ? err.response.data.message : err.message
                );
                setIsLoading(false);
            });
    };

    return (
        <Modal
            destroyOnClose={true}
            title='Create new user'
            visible={props.visible}
            onCancel={props.onClose}
            footer={null}
            width={window.innerWidth > 768 && 800}
            maskStyle={{ overflow: 'hidden' }}
        >
            <Spin spinning={isLoading}>
                <Form
                    autoComplete='off'
                    onFinish={handleCreateUser}
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
                        <Col md={{ span: 12 }} xs={{ span: 24 }}>
                            <Form.Item
                                name='firstName'
                                label='First name'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter first name',
                                    },
                                    { whitespace: true },
                                    {
                                        min: 3,
                                        message:
                                            'First name must be at least 3 characters',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input id='firstName' />
                            </Form.Item>
                        </Col>
                        <Col md={{ span: 12 }} xs={{ span: 24 }}>
                            <Form.Item
                                name='lastName'
                                label='Last name'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter last name',
                                    },
                                    { whitespace: true },
                                    {
                                        min: 3,
                                        message:
                                            'Last name must be at least 3 characters',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input id='lastName' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 12 }} xs={{ span: 24 }}>
                            <Form.Item
                                name='email'
                                label='Email'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter email',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Please enter a valid email',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input id='email' />
                            </Form.Item>
                        </Col>
                        <Col md={{ span: 12 }} xs={{ span: 24 }}>
                            <Form.Item
                                name='password'
                                label='Password'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter password',
                                    },
                                    {
                                        min: 8,
                                        pattern:
                                            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                                        message:
                                            'Password must contain at least 8 characters, one uppercase, one lowercase letter, one number and one symbol',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password id='password' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 12 }} xs={{ span: 24 }}>
                            <Form.Item
                                name='username'
                                label='Username'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter username',
                                    },
                                    { whitespace: true },
                                    {
                                        min: 3,
                                        message:
                                            'Username must be at least 3 characters',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input id='username' />
                            </Form.Item>
                        </Col>
                    </Row>

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

export default CreateUserModal;
