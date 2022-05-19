import { Pagination, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import Service from '../../api/Service';
import ErrorNotification from '../../components/ErrorNotification';
import PermissionItem from '../../components/PermissionItem';

function PermissionsPage() {
    const [permissions, setPermissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [pageNumber, setPageNumber] = useState(Number(0));
    const [perPagePerms, setPerPagePerms] = useState(Number(10));
    const [totalPermissions, setTotalPermissions] = useState(0);

    useEffect(() => {
        fetchPermissionsHandler(pageNumber, perPagePerms);
    }, []);

    const fetchPermissionsHandler = async (page, perPage) => {
        await Service.getAllPermissions({
            page,
            perPage,
        })
            .then((res) => {
                setPermissions(res.data.allPermissions);
                setTotalPermissions(res.data.totalPermissions);
            })
            .catch((err) => {
                setAlertMessage(
                    err.response.data ? err.response.data.message : err.message
                );
                setIsAlertVisible(true);
            });
        setIsLoading(false);
    };

    const onUpdatePermission = (perm) => {
        let tmpPermdata = [...permissions];
        tmpPermdata.forEach((prm) => {
            if (prm._id === perm._id) {
                prm.code = perm.code;
                prm.description = perm.description;
            }
        });
        setPermissions(tmpPermdata);
    };

    const onRemovePermission = (permId) => {
        let tmpPermdata = [...permissions];
        setPermissions(tmpPermdata.filter((perm) => perm._id !== permId));
    };

    const onChangeListHandler = (page, perPage) => {
        console.log(page, perPage);
        setPageNumber(page);
        setPerPagePerms(perPage);
        fetchPermissionsHandler(page, perPage);
    };

    return (
        <div style={{ margin: 20 }}>
            {isAlertVisible && (
                <ErrorNotification alertMessage={alertMessage} />
            )}
            <Spin spinning={isLoading}>
                {permissions.map((permission) => {
                    return (
                        <PermissionItem
                            key={permission._id}
                            permission={permission}
                            onUpdate={onUpdatePermission}
                            onRemove={onRemovePermission}
                        />
                    );
                })}
                <Pagination
                    total={totalPermissions}
                    showSizeChanger={true}
                    current={pageNumber === 0 ? 1 : pageNumber}
                    defaultPageSize={perPagePerms}
                    pageSizeOptions={['5', '10', '15']}
                    onChange={(page, pageSize) =>
                        onChangeListHandler(page, pageSize)
                    }
                />
            </Spin>
        </div>
    );
}
export default PermissionsPage;
