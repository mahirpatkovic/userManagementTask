import { Space } from 'antd';
import React from 'react';

export default function ({ title, content }) {
    return (
        <div>
            <Space>
                <p style={{ fontWeight: 'bold' }}>{title}:</p>
                <p>{content}</p>
            </Space>
        </div>
    );
}
