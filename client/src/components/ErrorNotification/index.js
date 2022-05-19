import React, { useEffect } from 'react';
import { notification } from 'antd';

export default function ({ alertMessage }) {
    const Notification = () => {
        useEffect(() => {
            notification.error({
                message: 'Error',
                description: alertMessage,
                duration: 6,
                placement: 'top',
            });
        }, []);
    };

    return <Notification />;
}
