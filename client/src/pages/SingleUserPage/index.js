import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Service from '../../api/Service';
import { Spin } from 'antd';
import ErrorNotification from '../../components/ErrorNotification';
import UserMainInfo from '../../components/UserMainInfo';

function SingleUserPage() {
    const id = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchSelectedUserHandler = async () => {
            await Service.getUser(id)
                .then((res) => {
                    console.log(res);
                    setUser(res.data.user);
                })
                .catch((err) => {
                    setAlertMessage(
                        err.response.data
                            ? err.response.data.message
                            : err.message
                    );
                    setIsAlertVisible(true);
                });
            setIsLoading(false);
        };
        fetchSelectedUserHandler();
    }, []);

    return (
        <div style={{ margin: 15 }}>
            {/* <Spin spinning={isLoading}> */}
            {isAlertVisible && (
                <ErrorNotification alertMessage={alertMessage} />
            )}
            <UserMainInfo user={user} />
            {/* </Spin> */}
        </div>
    );
}
export default SingleUserPage;
