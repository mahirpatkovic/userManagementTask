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
    message,
} from 'antd';
import Service from '../../api/Service';

const { TextArea } = Input;
function UpdatePermissionModal({
    id,
    visible,
    onClose,
    user,
    code,
    description,
}) {
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleUpdatePermission = async (values) => {
        setIsLoading(true);
        await Service.updatePermission({ ...values, id })
            .then((res) => {
                message.success(res.data.message);
                onClose(res.data.permission, true);
            })
            .catch((err) => {
                setIsAlertVisible(true);
                setAlertMessage(
                    err.response ? err.response.data.message : err.message
                );
            });
        setIsLoading(false);
    };

    return (
        <Modal
            destroyOnClose={true}
            title='Update permission'
            visible={visible}
            onCancel={onClose}
            footer={null}
            maskStyle={{ overflow: 'hidden' }}
        >
            <Spin spinning={isLoading}>
                <Form
                    autoComplete='off'
                    onFinish={handleUpdatePermission}
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
                                initialValue={code}
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
                                initialValue={description}
                            >
                                <TextArea rows={4} id='description' />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider />
                    <Row justify='end'>
                        <Space size='small'>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type='primary' htmlType='submit'>
                                Update
                            </Button>
                        </Space>
                    </Row>
                </Form>
            </Spin>
        </Modal>
    );
}

export default UpdatePermissionModal;
