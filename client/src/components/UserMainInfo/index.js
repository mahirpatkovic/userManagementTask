import React, { useState } from 'react';
import {
    Card,
    Divider,
    Row,
    Col,
    Form,
    Input,
    Checkbox,
    Button,
    Switch,
} from 'antd';
import DescriptionItem from '../DescriptionItem';
import './style.css';

function UserMainInfo(props) {
    const [isDisabled, setIsDisabled] = useState(true);
    const user = props?.user;
    // const isDisabledHandler = (checked) => {
    //     if (checked) {
    //         setIsDisabled(false);
    //     } else {
    //         setIsDisabled(true);
    //     }
    // };
    const handleUpdateUser = async (values) => {
        console.log(values);
        // setIsLoading(true);
        // await Service.updateUser({ ...values, id: user._id })
        //     .then((res) => {
        //         setIsLoading(false);
        //         setAlertMessage(res.data.message);
        //         setAlertType(res.data.status);
        //         setIsAlertVisible(true);
        //         setIsDisabled(true);
        //     })
        //     .catch((err) => {
        //         setIsLoading(false);
        //         setIsAlertVisible(true);
        //         setAlertMessage(
        //             err.response
        //                 ? err.response.data.message
        //                 : 'The connection to the server is not established'
        //         );
        //         setAlertType(err.response ? err.response.data.status : 'error');
        //     });
    };

    /////////////////////////////////////////////////////////

    ////// PROBLEM WITH ANT LIBRARY, DOESN'T WANT TO SHOW DEFAULT/INITIAL VALUES ON FORM.ITEM
    ////// UPDATE USER FEATURE IMPLEMENTED

    ////////////////////////////////////////////////////////

    return (
        <div className='mainInfoUserPage'>
            <Card
                cover={
                    <div>
                        <p className='cardUserName'>{`${user?.firstName} ${user?.lastName}`}</p>
                    </div>
                }
                className='cardMainInfo'
            >
                <Divider
                    orientation='left'
                    type='horizontal'
                    style={{ marginTop: -15 }}
                >
                    <h5>Main Information</h5>
                </Divider>
                <DescriptionItem
                    title='Full Name'
                    content={`${user?.firstName} ${user?.lastName}`}
                />
                <DescriptionItem title='Email' content={user?.email} />
                {/* <h4 style={{ float: 'right', marginRight: 10 }}>
                    Edit Profile{' '}
                    <Switch
                        checked={!isDisabled}
                        onChange={isDisabledHandler}
                    ></Switch>
                </h4> */}
                <Divider />

                <Form
                    autoComplete='off'
                    onFinish={handleUpdateUser}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 23 }}
                >
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
                                initialValue={user?.firstName}
                            >
                                <Input />
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

                    <Row>
                        <Col md={{ span: 12 }} xs={{ span: 24 }}>
                            <Form.Item name='status' label=' '>
                                <Checkbox checked={user?.status}>
                                    Status
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider />

                    <Row justify='center'>
                        <Col
                            xl={{ span: 4, offset: 0 }}
                            lg={{ span: 6, offset: 0 }}
                            md={{ span: 6, offset: 0 }}
                            sm={{ span: 8, offset: 0 }}
                            xs={{ span: 14, offset: 0 }}
                        >
                            <Button
                                // disabled={isDisabled}
                                type='primary'
                                htmlType='submit'
                                style={{ width: '100%', fontWeight: 'bold' }}
                            >
                                Update
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
}

export default UserMainInfo;
